// Requiring dependencies

const express = require('express');
const passport = require ('passport');
const OrderRouter = require ('./routes/OrderRoutes');

const app = express()

//Requiring passport
require("./passport")

app.use(express.json());

//specifying routes
//order route
app.use ('/orders', passport.authenticate(

    'Jwt', {session : false }), OrderRouter)
    app.use('/', AuthRouter)

    //home route
    app.get('/', (req, res) => {
        return res.json({status : true})
    })

    //error route
    app.use ('*', (req, res) => {
        return res.status(404).json ({message : 'route does not exist'})
    })
    module.exports = app;