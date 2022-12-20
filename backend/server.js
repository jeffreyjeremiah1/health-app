//jshint esversion:6
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const passport = require('passport');
const cookieParser = require("cookie-parser");
const session = require('express-session')
const mongoose = require("mongoose");
const multer = require('multer');
const dotenv = require('dotenv');
const routesUrls = require('./routes/route');
const cors = require('cors');
const flash = require('express-flash')



const corsOptions = {
    origin: '*', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"));


app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, expires: 600000}
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/app', routesUrls);


app.listen(4000, ()=> {
    console.log("Server started on port 4000");
});





