const express= require('express')
const jwt= require('jsonwebtoken')
//we need here router for backend
const router= express.Router(); //it have all the ability which is get by simple calling express
//get post everything can be done with the help of router
const bcrypt= require('bcryptjs')
require('../db/review')
const User=require('../model/userSchema')
router.get('/',(req,res)=>{
    res.send('ok');
})
//connect postman and mongodb
//use promise
// router.post('/register',(req,res)=>{   //use postman
//     // console.log('k');
//     // console.log(req.body)
//     // res.send('llo');
//     // res.json({message: req.body})
//     const {name, email, phone, password}= req.body;
//     // console.log(name);
//     // console.log(email);
//     //user not register if all details not filled
//     if(!name || !email || !phone || !password){
//         // return res.json({error: "provide all data"});
//         return res.status(422).json({error: 'plz provide all data'})
//     }
//     //check user already exist 
//     //left side email of database and right side email of user
//     User.findOne({email : email})       
//     .then((userExist)=>{                   //promise return
//          if(userExist){
//             return res.status(422).json({error:'email exist'})
//          }
//          const user = new User(req.body);        //if user is not exist then registered
//          user.save().then(()=>{
//             res.status(201).json({message: "user registered"})
//          }).catch((err)=>{
//              res.status(500).json({error:'unable to register'})
//          })
//     }).catch((err)=>{
//         console.log('err')
//     })                  
// })

//use async-await work as like promise
router.post('/register',async (req,res)=>{ 
    const {name, email, phone, password,  confirmpassword}= req.body;
    if(!name || !email || !phone || !password ||  !confirmpassword){         //no change as compare to promise
        // return res.json({error: "provide all data"});
        return res.status(404).json({error: 'plz provide all data'})
    }

    try{                                                            //change 
        const userExist= await  User.findOne({email : email})     
        if(userExist){
            return res.status(422).json({error:'email exist'})
         }else if(password != confirmpassword){
            return res.status(404).json({error:'password not match'})
         }else{
            //call save function here of userSchema
            const user = new User({name, email, phone, password,  confirmpassword});   
            const userregister = await user.save()  
            res.status(202).json({message: "user registered"})
           
         }
        //  const user = new User({name, email, phone, password,  confirmpassword});   
         //call userschema save function here
                
        //  console.log(`${user} user is registered`)  ;
        //  console.log(userregister)       
        //  if(userregister){
        //     res.status(201).json({message: "user registered"})
        //  }else{                                                    //else show catch part but not need to use 
        //     res.status(500).json({error:'unable to register'})
        //  }
         
    }catch(err){                            //if error then await show directly catch
        console.log('err')
    }                      
})
router.post('/signin',async (req,res)=>{
    // console.log(req.body);
    // const{email, password}=req.body;
    // res.json({message: 'fav'})
    // console.log(name);
    try{
        let token;
        const{email, password}=req.body;
        if(!email || !password){
            return res.status(400).json({message: 'fill all data'})
        }

        const userlogin = await User.findOne({email : email})
        // console.log(login);
        //userlogin.password means password which is in our email
        if(userlogin){
            const ifmatch= await bcrypt.compare(password, userlogin.password)
            token = await userlogin.generateAuthToken();
            console.log(token);
            //cookie
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 26892000000),
                httpOnly: true
            });
            if(!ifmatch){
                res.status(400).json({message:'password not match'})
            }else{
                res.json({message:'congrats you are signin'})
            }
        }else{
            return res.status(400).json({message: 'email not valid'})

        }
       
        //to check password matches
        

    }catch{
        console.log('error')
    }

})
module.exports =router;