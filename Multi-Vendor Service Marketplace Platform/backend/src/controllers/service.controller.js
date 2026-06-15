const serviceModel=require('../models/service.model')

const createService=async(req,res)=>{
    const {Title,Description,Category,Price,DeliveryTime}=req.body;

    try{const service= await serviceModel.create({
        Provider=req.Provider.id,
        Title,
        Description,
        Category,
        Price,DeliveryTime
        
    },{new:true})
    return res.status(201).json("New Service created successfully!")
}catch(err){
        return res.status(500).json({
            message:err.message
        })
    }





}

const getAllServices=async(req,res)=>{

    try{
        const services=await serviceModel.find(req.params.id,{new:true})
        return res.status(200).json(services)
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }

}

const editService=async(req,res)=>{

    try{
        const service=await serviceModel.findByIdAndUpdate(req.params.id,req.body)
        return res.status(209).json(
            service)
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }




}

const delService=async(req,res)=>{
        try{
        await serviceModel.findByIdAndDelete(req.params.id)
        return res.status(200).json("Service deleted successfully!")
}catch(err){
        return res.status(500).json({
            message:err.message
        })
    }



}

module.exports={createService,editService,delService,getAllServices}

