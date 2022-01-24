const express = require('express')
const router = express.Router()
const ClientModel = require('../../models/clients'); // client model

// @Route   routes/api/addcity
// POST     Add city
// @Access  Public
router.post('/addcity', (request, response) => {
    ClientModel.findOne({ email: request.body.email }, { cities: 1 })
    .then(clients => {
        var isCityExist = false

        for(var i = 0; i < clients.cities.length; i++){
            if(clients.cities[i].name == request.body.city){
                isCityExist = true
            }
        } // FIN BOUCLE
        
        if(isCityExist === false){
            // ADD CITY
            ClientModel.updateOne({ email: request.body.email }, { $push: {cities: { name: request.body.city }} })
                .then(city => {
                    ClientModel.findOne({ email: request.body.email }, { cities: 1 })
                        .then(clientsUpdated => { 
                            console.log("CLIENT UPDATED", clientsUpdated) 
                            response.json({ status: "SUCCESS", msg: "Your City is added successfully", cities: clientsUpdated.cities, object: city})
                        })
                })
        }else{
            // city is already exist
            response.json({ status: "FAILED", msg: "City is already exist" })
        }

    })
    
});


// @Route   routes/api/deletecity
// POST      Delete City
// @Access  Public
router.post('/deletecity', (request, response) => {
    //console.log("DATA : ", request.body)
    ClientModel.findOne({ email: request.body.email }, { cities: 1 })
    .then(clients => {
        isFound = false

        console.log(clients.cities)
        for(var i = 0; i < clients.cities.length; i++){
            
            if(clients.cities[i]._id == request.body.id){
                isFound = true
            }
        } // FIN BOUCLE
        console.log("isFound final", isFound)
        if(isFound === true){
            // ON DELETE CITY
            ClientModel.updateOne({ email: request.body.email }, 
                    { 
                    $pull: {
                        cities: {
                            _id: request.body.id
                        }
                    }
                })
                .then(city => {
                    //RESPONSE
                    response.json({ status: city, msg: "City is deleted Successfully" })
                    
                })
        } // FIN CONDITION
    })

});


// @Route   api/index/selectCities
// POST      Select Cities
// @Access  Public
router.post('/selectCities', (request, response) => {
    ClientModel.findOne({ email: request.body.email }, { cities: 1 })
    .then(cities => response.json(cities))
});

module.exports = router