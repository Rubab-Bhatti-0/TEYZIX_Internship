const mongoose=require('mongoose')

const userschema= new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:['user','provider','admin'],
        default: 'user'
    }
},{timestamps:true})

const userModel= mongoose.model('user',userschema)

module.exports=userModel
