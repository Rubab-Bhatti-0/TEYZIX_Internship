const mongoose=require('mongoose');

const providerSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    picture:{
        type:String
    },
    skills:{
        type:[String]
    },
    experience:{
        type:Number
    },
    pricing:{
        type:Number
    },
    portfolio:{
        type:[String]
    }

},{timestamps:true})

const providerModel=mongoose.model('provider',providerSchema);
module.exports=providerModel;
