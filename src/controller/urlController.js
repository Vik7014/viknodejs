const urlModel = require('../model/urlModel')
const randomString = require('randomstring');
const redis = require("redis");
const { promisify } = require("util");

//=======================================Connect to redis=============================================//

const redisClient = redis.createClient(
    15264,
    "redis-15264.c276.us-east-1-2.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);

redisClient.auth("69ShMcjnOi8767egIKZw3XxX2wtvlav2", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


//==============================================POST /url/shorten=======================================================//

const urlShortner = async function (req, res) {
    try {
        const reqBody = req.body;
        const longUrl = req.body.longUrl

        const urlValidatorRegex = /^(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%.\+#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.#?&//=_]*$)/g

        if (!longUrl) {
            return res.status(400).send({ status: true, message: "longUrl must be required...", })
        }

        const longUrlValidator = (urlValidatorRegex).test(longUrl)

        if (!longUrlValidator) {
            return res.status(400).send({ status: false, message: "Url is not a valid Url format", })
        }

        //checking longUrl in Redis
        const checkLongUrlInRedis = await GET_ASYNC(`${longUrl}`)

        const redisOutPut = JSON.parse(checkLongUrlInRedis)

        if (checkLongUrlInRedis) {
            return res.status(200).send({ status: true, message: "Short Url is already created for this url ", data: redisOutPut })
        }

        const checkDuplicateLongUrlInDB = await urlModel.findOne({ longUrl }).select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0 })
       
        // adding key and vlaue in Redis in the form of string
        await SET_ASYNC(`${longUrl}`, JSON.stringify(checkDuplicateLongUrlInDB))
       
        if (checkDuplicateLongUrlInDB) {
            return res.status(200).send({ status: true, message: "Short Url is already created for this url", data: checkDuplicateLongUrlInDB })
        }

        //genrating urlCode and avoiding duplicate
        let f = false
        while (f == false) {
            var urlCode = randomString.generate({ length: 8, charset: 'alphabetic',capitalization:'lowercase' })
            const checkDuplicateUrlCode = await urlModel.findOne({ urlCode })
            if (!checkDuplicateUrlCode) {
                f = true
                break;
            }

        }

        let shortUrl = `http://localhost:3000/${urlCode}`

        //Adding keys and value in reqBody
        reqBody.shortUrl = shortUrl
        reqBody.urlCode = urlCode

        createUrl = await urlModel.create(reqBody)

        // creating empty obj to store to show only required keys and value
        let obj = {};
        obj.longUrl = createUrl.longUrl
        obj.shortUrl = createUrl.shortUrl
        obj.urlCode = createUrl.urlCode

        return res.status(201).send({ status: true, data: obj })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }

}


//=============================================GET /:urlCode======================================

const getUrl = async function (req, res) {
    try {

        const urlCode = req.params.urlCode

        // find urlCode in Redis
        const findUrlCodeInRedis = await GET_ASYNC(`${urlCode}`)
        const redisOutPut = JSON.parse(findUrlCodeInRedis)
        
        if (findUrlCodeInRedis) {
            return res.status(301).redirect(redisOutPut.longUrl)
        }

        // find urlCode in DB
        const findUrlCodeInDB = await urlModel.findOne({ urlCode: urlCode })

        if (!findUrlCodeInDB) {
            return res.status(404).send({ status: false, message: "urlCode is not found in DB..." })
        }
         
        // adding key and vlaue in Redis in the form of string
        await SET_ASYNC(`${urlCode}`, JSON.stringify(findUrlCodeInDB))

        return res.status(301).redirect(findUrlCodeInDB.longUrl)

    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}




module.exports = { urlShortner, getUrl }