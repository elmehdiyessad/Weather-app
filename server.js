const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Index = require('./routes/api/index')
const Login = require('./routes/api/login')
const Register = require('./routes/api/register')
const config = require('./config/config')
const mongoose = require('mongoose')
const bdd = config.Connection
const PORT = process.env.PORT || 5000

// app.get('/api/customers', (request, response) => {
//     const customers = [
//         { id: 1, firstName: "Jack", lastName: "Bloe" },
//         { id: 2, firstName: "Lili", lastName: "Bradley" },
//         { id: 3, firstName: "Jhon", lastName: "Norris" }
//     ];
//     response.json(customers);
// })


// Connection to MongoDB
mongoose
    .connect(bdd, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => { console.log("MongoDB Connected ...") })
    .catch(err => console.log(err))


// MIDDLEWARE

app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// MY OWN
app.use('/api/register', Register)
app.use('/api/login', Login)
app.use('/api/index', Index)


// lien de comment consommer une API => https://pusher.com/tutorials/consume-restful-api-react
app.listen(PORT, () => {
    console.log(`SERVER LISTEN ON PORT ${PORT}`)
})

