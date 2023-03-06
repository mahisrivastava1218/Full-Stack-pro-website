const express=require('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const app=express();
dotenv.config({path: './config.env'})
require("./db/review");
// link router files to make root easy
app.use(express.json())
app.use(require('./router/auth'))

const User=require('./model/userSchema')
const PORT= process.env.PORT

mongoose.set('strictQuery', true);
const middleware=(req,res,next)=>{
    console.log('middleware')
    next();
}

app.get('/',(req,res)=>{
    res.send('jppp')
})
app.get('/about',(req,res)=>{
    res.send('jppp')
})

app.get('/contact',middleware,(req,res)=>{
    console.log('contact')
    res.send('jppp')
})
app.get('/signin',(req,res)=>{
    // res.cookie('jwtoken','token')
    res.send('jppp')
})
app.get('/signup',(req,res)=>{
    res.cookie('dheera','kppa')
    res.send('jppp')
})

app.listen(PORT,()=>{
    console.log(`hello ${PORT}`)
})
