const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const keys = require('./config/keys')
const authRoutes = require('./routs/auth');
const categoryRoutes = require('./routs/category');
const positionRoutes = require('./routs/position');
const groups = require('./routs/groups')
const users = require('./routs/users')
const lesson = require('./routs/lesson')
const task = require('./routs/tasks')
const app = express();
const path = require('path')

mongoose.connect(keys.mongo_uri, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
    .then(()=>console.log("allright"))    

app.use(express.json({extended:true}))
app.use(passport.initialize())
require('./middleware/passport')
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/groups', groups);
app.use('/api/user', users);
app.use('/api/lesson', lesson);
app.use('/api/task', task);

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    })
}


module.exports = app;