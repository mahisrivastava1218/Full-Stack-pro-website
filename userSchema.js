const mongoose=require('mongoose');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                  type: String,
                  required: true
            }
        
        }
    ]
    

    
})


// if middleware use then call next 
// to return promise use async function

//providing hashing function password
userSchema.pre('save',async function (next){
    console.log("I'm running")
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,14);    //password is store in hashing form //this.password means current password
        this.confirmpassword= await bcrypt.hash(this.confirmpassword,14);
    }
    next();
});
//generate token
//because this keyword is used so we have to use async function
//userSchema is instance to use this use method inst
userSchema.methods.generateAuthToken= async function(){
    try{
        //token generate
        //two types of token : 1)jwt sign: is used to generate token 2) jwt verified: used to verified
        //jwt.sign(payload, secret keyorprivate key)) //payload should be unique
        //id is objectid store in mongodb which is unique
        // token store in database
        let token=jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens= this.tokens.concat({token: token })
         await this.save();
         return token;
        
    }catch(err){
          console.log(err);
    }
}



const User = mongoose.model('User',userSchema);

module.exports =User;
