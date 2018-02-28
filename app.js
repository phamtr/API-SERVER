const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/oders');
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
module.exports = app;