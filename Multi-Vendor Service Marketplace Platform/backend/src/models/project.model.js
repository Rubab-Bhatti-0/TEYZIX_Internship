const mongoose=require ('mongoose')

const projectSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Service'
    },
    requirements:{
        type:String
    },
    budget:{
        type:Number
    },
    deadline:{
        type:Date
    },
    status:{
        type:String,
        enum:["pending","accepted","progress","completed","rejected"],
        default:"pending"
    },
    review:{
        rating: Number,
        comment: String
    }
},{timestamps:true})

const projectModel=mongoose.model('project',projectSchema)
module.exports=projectModel
