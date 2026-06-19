const usermodel=require('../models/user.model')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;


async function registerUser(req,res){
    const {name, email,password,role}=req.body;

    const isUserAlreadyExists= await usermodel.findOne({
            email
        
    })

    if(isUserAlreadyExists){
        return res.status(409).json("User already Exists");
    }

    const hash= await bcrypt.hash(password,10);

    const user = await usermodel.create({
        name,
        email,
        password:hash,
        role
    })

    const token=jwt.sign({
        id:user._id,
        role:user.role

},JWT_SECRET_KEY);


res.status(201).json({
   message:"New user created successfully!",
   token:token,
   user:{id:user._id, name:user.name, email:user.email, role:user.role}
})
    

}

async function loginuser(req,res){

    const {email , password}=req.body;

    const isUserExists= await usermodel.findOne({
        email
    })
     if(!isUserExists){
        return res.status(401).json("User not found.Check your credentials.");
     }

     const isuserFound= await bcrypt.compare(password,isUserExists.password);
     if(!isuserFound){
        return res.status(401).json({
            message:"Wrong Password"
        })
     }
     const token=jwt.sign({
        id:isUserExists._id,
        role:isUserExists.role,
     },process.env.JWT_SECRET_KEY);

     res.status(200).json({
        message:"Login successfully!",
        token:token,
        user:{id:isUserExists._id, name:isUserExists.name, email:isUserExists.email, role:isUserExists.role}
     })



}

async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" })

}

module.exports={registerUser,loginuser,logoutUser}
