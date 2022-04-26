let axios = require("axios");



let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getSession= async function (req,res){

     try{

        let district=req.query.district
        let date=req.query.date
            
        var options ={

            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }

             let result= await axios(options)
             console.log(result.data)
             res.status(200).send({msg:result.data})

     }


     catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}

let getWeather=async function(req,res){
    try{

        var options={

            method:"get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=f8df66074076293c449e0f887dbef013`
        }
        let result= await axios(options)
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })

    }
    
        catch (err) {
            console.log(err)
            res.status(500).send({ msg: err.message })
        }
    
}


let getSort=async function(req,res){
 try{

    let cities=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
    let newArr=[]

    for(i=0;i<cities.length;i++){
        let obj={city:cities[i]}
        let res=await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=f8df66074076293c449e0f887dbef013`)
        console.log(res.data.main.temp)
        obj.temp=res.data.main.temp
        newArr.push(obj)

    }
    let sorted=newArr.sort(function (a,b){return a.temp-b.temp})
    console.log(sorted)
    res.status(200).send({status:true,data:sorted})

 }


catch (err) {
            console.log(err)
            res.status(500).send({ msg: err.message })
        }
    


}

let getMemes= async function (req,res){

    try{

        var options={

            method:"get",
            url: `https://api.imgflip.com/get_memes`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }



    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


const createMeme = async function(req,res){
    try{
        let text0 = req.query.text0
        let text1 = req.query.text1
        let username = req.query.username
        let password = req.query.password
        let id = req.query.template_id

        let options = {
            method : 'post',
            url : `http://api.imgflip.com/caption_image/?template_id=${id}text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }

    let result = await axios(options)
    res.status(200).send({status:true, msg : result.data})
    }
    catch(err){
        console.log(err.message)
        res.status(500).send({msg: err.message})
    }
}







module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getSession=getSession
module.exports.getWeather=getWeather
module.exports.getSort=getSort
module.exports.getMemes=getMemes
module.exports.createMeme=createMeme