const mongoose=require('mongoose');

const providerSchema=new mongoose.Schema({
    user={
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    picture={
        type:String
    },
    skills={
        type:[String]
    },
    experience={
        type:Number
    },
    pricing={
        type:Number
    },
    portfolio={
        type:[String]
    }

},{timestamps=true})

const ProviderModel=mongoose.model('provider',providerSchema);
module.exports=providerModel;