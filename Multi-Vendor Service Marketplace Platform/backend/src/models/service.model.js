const mongoose=require('mongoose')

const serviceSchema=new mongoose.Schema({
    provider={
        type:mongoose.Schema.Types.ObjectId,
        require:true

    },
    Title={
        type:String,
        require=true
    },
    Description={
        type:String
    },
    Category={
        type:String,
        enum:['web-dev', 'design', 'content', 'marketing']

    },
    Price={
        type:Number

    },
    DeliveryTime={
        type:Date
    }

},{timestamps:true})

const serviceModel=mongoose.model('service',serviceSchema)

module.exports=serviceModel