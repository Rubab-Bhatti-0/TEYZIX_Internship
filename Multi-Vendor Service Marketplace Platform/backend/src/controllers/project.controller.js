const projectModel=require('../models/project.model')

const createProject=async(req,res)=>{

    try{
    const project=await projectModel.create(...req.body,Customer=req.user.id)
    res.status(201).json(project)
    }catch(err){
        res.status(500).json({message:err.message})
    }

}

const brosweProjects=async(req,res)=>{
    try{
    const project=await projectModel.findByIdAndUpdate(req.params.id)
    res.status(200).json(project)
    }catch(err){
        res.status(500).json({message:err.message})
    }

}


const updateStatus=(req,res)=>{
    try{
    const project=await projectModel.findByIdAndUpdate(req.params.id,{
        status:req.body.status
    })
    res.status(200).json(project)
    }catch(err){
        res.status(500).json({message:err.message})
    }
    
}

const addReview=(req,res)=>{
    try{
    const project=await projectModel.findByIdAndUpdate(req.params.id,{
        rating:req.body.rating,
        review:req.body.review
    })
    res.status(200).json(project)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getMyRequests=(req,res)=>{
    try{
    const project=await projectModel.find({Customer:req.user.id}).populate('service'
    )
    res.status(200).json(project)
    }catch(err){
        res.status(500).json({message:err.message})
    }   
}

const getProviderRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate({
      path: 'service', match: { provider: req.user.id }
    }).populate('customer', 'name email')
    return res.status(200).json(requests.filter(r => r.service))
  } catch (err) { return res.status(500).json({ message: err.message }) }
}

const adminStats = async (req, res) => {
  try {
    const Request = require('../models/request.model')
    const User = require('../models/user.model')
    const Service = require('../models/service.model')
    const users = await User.countDocuments()
    const services = await Service.countDocuments()
    const requests = await Request.countDocuments()
    return res.status(200).json({ users, services, requests })
  } catch (err) { return res.status(500).json({ message: err.message }) }
}

module.exports={createProject,addReview,getMyRequests,updateStatus,getProviderRequests,adminStats}