const express=require ('express')

const router=express.router
const {verifyToken,isProvider} =require('../middleware/auth.middleware')
const service=require('../controllers/service.controller')


router.get('/service',service.getAllServices)
router.post('/service',verifyToken,isProvider,service.createService)
router.put('/service/:id',verifyToken,isProvider,service.editService)
router.delete('/service/:id',verifyToken,isProvider,service.delService)

module.exports=router