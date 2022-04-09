const express = require('express');
const res = require('express/lib/response');
const logger = require('./logger')

 const router = express.Router();

// router.get('/user-profile/:abcd', function(req, res) {
//     console.log(req)
//     console.log(req.params.abcd)
//     res.send('dummy response')
// })

// router.get('/movies', function (req, res) {
//     console.log('------------------')
//     console.log(req)
//     console.log('------------------')
//     console.log('These are the request query parameters: ', req.query)
//     res.send('My first ever api!')
// });

router.get('/movies', function(req,res){
    const arr= ["thappad","surya","the shining","the lord","godzila"]
    res.send(arr)
});

////// problem 2

router.get('/movies/:indexNumber', function(req, res){
    const arr1= ["rang de basnasti", "the shining", "lord of the rings","bartman begins"];
     const a = req.params.indexNumber
     if(a<arr1.length){
         res.send(arr1[a])
     }else{
         res.send("out of array")
     }
         
     });


     ///// problem 4

     router.get('/films', function (req, res) {

     const b =[ {
        "id": 1,
        "name": "The Shining"
       }, {
        "id": 2,
        "name": "Incendies"
       }, {
        "id": 3,
        "name": "Rang de Basanti"
       }, {
        "id": 4,
        "name": "Finding Nemo"
       }]
       res.send(b)
    });
       //>>>>> prob 5
    router.get('/films/:filmId', function(req, res) {

        let indexfilm = req.params.filmId
        const y = 1;
        const z = indexfilm - y
    
        let allfilm = [ {
            "id": 1,
            "name": "The Shining"
           }, {
            "id": 2,
            "name": "Incendies"
           }, {
            "id": 3,
            "name": "Rang de Basanti"
           }, {
            "id": 4,
            "name": "Finding nemo"
           }]
        
        if (z < allfilm.length){
            res.send(allfilm[z])
        }else {
            res.send("no movie")
        }
    });






module.exports = router;
// adding this comment for no reason