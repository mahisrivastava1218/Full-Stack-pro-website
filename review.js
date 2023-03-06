const mongoose=require('mongoose')
mongoose.set('strictQuery', true);
const DB= process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true
}).then(()=>{
    console.log('connected')
}).catch((err)=>{
    console.log('error')
})