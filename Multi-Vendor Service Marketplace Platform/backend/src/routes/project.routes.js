const express=require('express')
const router =express.Router()
const {verifyToken} =require('../middleware/auth.middleware')

const project=require('../controllers/project.controller')

router.post('/project',verifyToken,project.createProject)
router.put('/:id/status', verifyToken, project.updateStatus)
router.put('/:id/review', verifyToken, project.addReview)
router.get('/myRequests', verifyToken, project.getMyRequests)
router.get('/provider', verifyToken, project.getProviderRequests)
router.get('/admin/stats', verifyToken, project.adminStats)

module.exports = router
