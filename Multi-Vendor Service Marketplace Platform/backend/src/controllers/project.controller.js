const projectModel=require('../models/project.model')

const createProject=async(req,res)=>{

    try{
    const project=await projectModel.create({
        ...req.body,
        Customer:req.user.id
    })
    res.status(201).json({
        message:"Project created successfully!",
        project:project
    })
    }catch(err){
        res.status(500).json({message:err.message})
    }

}

const browseProjects=async(req,res)=>{
    try{
    const project=await projectModel.findById(req.params.id)
    res.status(200).json(project)
    }catch(err){
        res.status(500).json({message:err.message})
    }

}


const updateStatus=async(req,res)=>{
    try{
    const project=await projectModel.findByIdAndUpdate(req.params.id,{
        status:req.body.status
    },{new:true})
    res.status(200).json({
        message:"Status updated successfully!",
        project:project
    })
    }catch(err){
        res.status(500).json({message:err.message})
    }
    
}

const addReview=async(req,res)=>{
    try{
    const project=await projectModel.findByIdAndUpdate(req.params.id,{
        rating:req.body.rating,
        feedback:req.body.feedback
    },{new:true})
    res.status(200).json({
        message:"Review added successfully!",
        project:project
    })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

const getMyRequests=async(req,res)=>{
    try{
    const projects=await projectModel.find({Customer:req.user.id})
    res.status(200).json(projects)
    }catch(err){
        res.status(500).json({message:err.message})
    }   
}

const getProviderRequests = async (req, res) => {
  try {
    const projects = await projectModel.find({Provider:req.user.id})
    return res.status(200).json(projects)
  } catch (err) { 
    return res.status(500).json({ message: err.message }) 
  }
}

const adminStats = async (req, res) => {
  try {
    const User = require('../models/user.model')
    const Service = require('../models/service.model')
    const users = await User.countDocuments()
    const services = await Service.countDocuments()
    const projects = await projectModel.countDocuments()
    return res.status(200).json({ users, services, projects })
  } catch (err) { 
    return res.status(500).json({ message: err.message }) 
  }
}

module.exports={createProject,browseProjects,addReview,getMyRequests,updateStatus,getProviderRequests,adminStats}
