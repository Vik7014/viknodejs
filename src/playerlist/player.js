let playerlist =function(req,res){
    let data= req.body.name

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ]
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ]
       },
       

      
   ]

   

   for(let i=0; i<players.length; i++){
    console.log(req.body.name === players[i].name);
    if(req.body.name === players[i].name){
        res.send({msg : "players data already exist"})
        break;
    }
}
res.send({data: players , status: true})
 
}
module.exports.playerlist = playerlist