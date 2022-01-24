const express = require('express');
const mongoose = require('mongoose');


// CITY SCHEMA
const CitiesSchema = new mongoose.Schema({
    name : {
        type: String,
        required: false
    }
});


const ClientSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    cities : {
        type: [CitiesSchema]
    },
    password : {
        type: String,
        required: true
    }
});

const ClientModel = mongoose.model('clients', ClientSchema)

module.exports = ClientModel