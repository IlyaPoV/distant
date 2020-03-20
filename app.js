const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const keys = require('./config/keys')
const authRoutes = require('./routs/auth');
const analyticsRoutes = require('./routs/analytics');
const categoryRoutes = require('./routs/category');
const orderRoutes = require('./routs/order');
const positionRoutes = require('./routs/position');
const app = express();

mongoose.connect(keys.mongo_uri, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
    .then(()=>console.log("allright"))    
//
app.use(passport.initialize())
require('./middleware/passport')
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;