const projectModel=require('../models/project.model')

const createProject=async(req,res)=>{
    try{
        const { serviceId, providerId, requirements, budget, deadline } = req.body;
        const project=await projectModel.create({
            user: req.user.id,
            service: serviceId,
            provider: providerId,
            requirements,
            budget,
            deadline,
            status: 'pending'
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
            review: {
                rating: req.body.rating,
                comment: req.body.comment
            }
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
        const projects=await projectModel.find({user:req.user.id})
            .populate('service')
            .populate('provider', 'name email')
        res.status(200).json(projects)
    }catch(err){
        res.status(500).json({message:err.message})
    }   
}

const getProviderRequests = async (req, res) => {
  try {
    const projects = await projectModel.find({provider:req.user.id})
        .populate('service')
        .populate('user', 'name email')
    return res.status(200).json(projects)
  } catch (err) { 
    return res.status(500).json({ message: err.message }) 
  }
}

const adminStats = async (req, res) => {
  try {
    const User = require('../models/user.model')
    const Service = require('../models/service.model')
    
    const [
        totalUsers,
        totalServices,
        totalRequests,
        pendingRequests,
        acceptedRequests,
        completedRequests,
        rejectedRequests
    ] = await Promise.all([
        User.countDocuments(),
        Service.countDocuments(),
        projectModel.countDocuments(),
        projectModel.countDocuments({ status: 'pending' }),
        projectModel.countDocuments({ status: 'accepted' }),
        projectModel.countDocuments({ status: 'completed' }),
        projectModel.countDocuments({ status: 'rejected' })
    ]);

    return res.status(200).json({ 
        totalUsers, 
        totalServices, 
        totalRequests,
        pendingRequests,
        acceptedRequests,
        completedRequests,
        rejectedRequests
    })
  } catch (err) { 
    return res.status(500).json({ message: err.message }) 
  }
}

module.exports={createProject,browseProjects,addReview,getMyRequests,updateStatus,getProviderRequests,adminStats}
