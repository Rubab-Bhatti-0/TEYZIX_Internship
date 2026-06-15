const mongoose=require ('mongoose')

const projectSchema=new mongoose.Schema({
    Customer={
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    Provider={
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    Requirements={
        type:String
    },
    Budget={
        type:Number,
        require:true
    },
    Deadline={
        type:Date,
        require:true
    },
    status={
        type:String,
        enum:["Pending","Accepted","Progress","Completed","Delivered"],
        default:"Pending"
    },
    rating={
        type:Number
    },
    feedback:{
        type:String
    }
})

const projectModel=mongoose.model('project',projectSchema)
module.exports=projectModel