const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/databse');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/oders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) =>{
    if(err){
        console.log('Could Not connect to database', err);
    }else{
        //console.log(config.secret);
        console.log('Connected to database: ' + config.db);
    }
});

app.use(cors({
    origin: 'http://localhost:3000'
}));



// Routes which should handle requests

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) =>{
const error = new Error('Not found');
error.status = 404;
next(error);
});
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;