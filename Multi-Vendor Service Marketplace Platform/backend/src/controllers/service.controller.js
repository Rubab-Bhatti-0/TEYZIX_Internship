const serviceModel=require('../models/service.model')

const createService=async(req,res)=>{
    const {Title,Description,Category,Price,DeliveryTime}=req.body;

    try{
        const service= await serviceModel.create({
            provider:req.user.id,
            Title,
            Description,
            Category,
            Price,
            DeliveryTime
        })
        return res.status(201).json({
            message:"New Service created successfully!",
            service:service
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const getAllServices=async(req,res)=>{

    try{
        const services=await serviceModel.find()
        return res.status(200).json(services)
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }

}

const editService=async(req,res)=>{

    try{
        const service=await serviceModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json({
            message:"Service updated successfully!",
            service:service
        })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }

}

const delService=async(req,res)=>{
        try{
        await serviceModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"Service deleted successfully!"})
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }

}

module.exports={createService,editService,delService,getAllServices}
