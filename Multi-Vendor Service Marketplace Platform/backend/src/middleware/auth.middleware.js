const jwt=require('jsonwebtoken')

require('dotenv').config()

const verifyToken=(req,res,next)=>{

    const authheaders=req.headers('authorization')
    const token=authheaders && authheaders.split(' ')[1]

    if(!token){
        return res.status(401).json({message:'No token'})
    }
    try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=token
    next()
    }catch{
       return res.status(401).json({
            message:"Invalid token"
        })
    }

}

const isProvider=(req,res,next)=>{
    if(req.user.role!=='provider'){
        return res.status(401).json({
            message:"Require providers only!"
        })
        next()
    }

}

const isCustomer=(req,res,next)=>{
    if(req.user.role!=='user'){
        res.status(401).json({
            message:"require a user only!"
        })
        next()
    }
}

const isAdmin=(req,res,next)=>{
    if(res.user.role!=='admin'){
        res.status(401).json({
            message:'Require admin only!'
        })
        next()
    }
}

module.exports={verifyToken,isProvider,isCustomer,isAdmin}