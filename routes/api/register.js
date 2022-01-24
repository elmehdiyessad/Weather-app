const express = require('express');
const router = express.Router();
const ClientModel = require('../../models/clients'); // client model


// @Route   /register
// POST     Add client
// @Access  Public
router.post('/add', (request, response) => {
    console.log(request.body)
    var isFound = false
    var msg
    ClientModel.find()
    .then(clients => {
        // response.send(clients)
        // console.log(clients)
        clients.forEach(element => {
            if(element.email === request.body.email){
                console.log("EMAIL TROUVEE")
                msg = "EMAIL TROUVEE"
                isFound = true
            }
        });
        console.log("isFound" + isFound)
        if(isFound === false){
            console.log("ADD INTO DATABASE")
            // ADD CLIENT TO A DATABASE
            const ClientToAdd = new ClientModel({
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                cities: [{ name: "Marrakech" }, { name: "Seoul" }],
                password: request.body.password
            });
            // SAVE CLIENT INTO A DATABASE
            ClientToAdd
                .save()
                .then(client => response.json(client));
        }else{
            // DON'T ADD INTO DATABASE
            console.log("don't add into database")
            response.send("error")
        }

    });

});



// @Route   /select
// GET      getAll clients
// @Access  Public
router.get('/select', (request, response) => {
    ClientModel.find()
    .then(clients => response.json(clients))
});

module.exports = router