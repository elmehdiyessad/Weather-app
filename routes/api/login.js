const express = require('express')
const router = express.Router()
const ClientModel = require('../../models/clients'); // client model

// @Route   routes/api/select
// GET      Select clients
// @Access  Public
router.post('/select', (request, response) => {
    ClientModel.find()
    .then(clients => response.json(clients))
});


module.exports = router