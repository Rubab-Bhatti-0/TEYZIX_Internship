const mongoose=require ('mongoose')

const projectSchema=new mongoose.Schema({
    Customer:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    },
    Provider:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    },
    Requirements:{
        type:String
    },
    Budget:{
        type:Number,
        require:true
    },
    Deadline:{
        type:Date,
        require:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Progress","Completed","Delivered"],
        default:"Pending"
    },
    rating:{
        type:Number
    },
    feedback:{
        type:String
    }
},{timestamps:true})

const projectModel=mongoose.model('project',projectSchema)
module.exports=projectModel
