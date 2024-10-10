const express = require('express');
const path = require('path');
// const bodyparser = require("body-parser");
const session = require("express-session");
const{v4:uuidv4} = require("uuid");
const nocache = require("nocache")
const router = require('./router');


const app=express();

const port= process.env.PORT||3700;

app.use(nocache())

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.use(session({
    secret:uuidv4(), 
    resave:false,
    saveUninitialized:true
 }));

 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Add this middleware to set Cache-Control headers



app.set('view engine','ejs');




app.use('/route',router)


//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
//home route
app.get('/',((req,res)=>{
    if(!req.session.user){
    res.render('base',{title:"Login System"});
    }else{
        res.redirect("/route/dashboard")
    }
}))


app.listen(port,()=>{console.log("Lostening to the server on http://localhost:3700")})