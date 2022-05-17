const urlModel = require('../models/urlModel')
const randomString = require('randomstring');
const axios =require('axios')



const urlShortner = async function (req, res) {
    try {
        const data = req.body;
        const longUrl = req.body.longUrl
        const urlValidatorRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

        if(!longUrl){
            return res.status(400).send({ status: true, message: "longUrl must be required...", })
        }

        const longUrlValidator = (urlValidatorRegex).test(longUrl)

        if (!longUrlValidator) {
            return res.status(400).send({ status: true, message: "Url is not a valid Url format", })
        }

        const checkDuplicateLongUrl = await urlModel.findOne({longUrl}).select({createdAt:0, updatedAt:0, __v:0, _id:0})

        if(checkDuplicateLongUrl){

            return res.status(201).send({ status: true, data: checkDuplicateLongUrl })
        }

        let count =0
        let f= false
        while(f==false){
            var urlCode = randomString.generate({ length: 8, charset: 'alphabetic' }).toLowerCase()
            const checkDuplicateUrlCode = await urlModel.findOne({urlCode})
            if(!checkDuplicateUrlCode){
                f=true
                break;
            }
            count++
        }

        console.log('count',count);
        let shortUrl = `http://localhost:3000/${urlCode}`     
        data.shortUrl = shortUrl
        data.urlCode = urlCode
        // console.log('code',urlCode)
        // console.log('short code',shortUrl)

        createUrl = await urlModel.create(data)
        let obj ={};
        obj.longUrl =createUrl.longUrl
        obj.shortUrl =createUrl.shortUrl
        obj.urlCode =createUrl.urlCode

        console.log(createUrl)
        return res.status(201).send({ status: true, data: obj })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }

}


//=============================================GET /:urlCode======================================

const getUrl = async function(req,res){
try{

    const urlCode = req.params.urlCode

    if(!urlCode){
        return res.status(400).send({ status: false, message:"urlCode is not found..." })
    }

    const checkUrlCode = await urlModel.findOne({urlCode:urlCode})

    if(!checkUrlCode){
        return res.status(404).send({ status: false, message:"urlCode is not found in DB..." })
    }
    let longUrl = checkUrlCode.longUrl
    
    let result = await axios.get(`${longUrl}`)
    console.log(result)

 return res.status(302).redirect(longUrl)
}
catch (error) {
    return res.status(500).send({ status: false, error: error.message })
}
}




module.exports = { urlShortner,getUrl }