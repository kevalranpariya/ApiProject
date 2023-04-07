const { urlencoded } = require('express');
const express= require('express');

const port = 4600;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kevalran720:YUYC7k9UhHR7Gecw@cluster0.mmypcla.mongodb.net/APIJWT',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log('Database not connected');
    console.log(err);
});


const server = express();

server.use(urlencoded());
const passport = require('passport');
const AdminJWTstrategy = require('./config/passport-jwt-strategy');
const ManagerJWTStrategy = require('./config/passport-manager-strategy');
const EmployeeJWTStratrgy = require('./config/passport-employee-stratrgy');
const session = require('express-session');
const cookieParser = require('cookie-parser');

server.use(cookieParser())

server.use(session({
    name : 'keval',
    secret : 'Rnw',
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 10*100*1000
    }
}));

server.use(passport.initialize())
server.use(passport.session());

server.use('/', require('./routes/index'))

server.listen(port,(err)=>{
    if(err)
    {
        console.log('Server not Responding');
        return false
    }
    console.log('Server Responding');
});