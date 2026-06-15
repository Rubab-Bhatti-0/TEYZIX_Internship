const express=require('express')
const router =express.Router()
const {verifyToken} =require('../middleware/auth.middleware')

const project=require('../controllers/project.controller')

router.post('/project',verifyToken,project.createProject)
router.put('/:id/status', verifyToken, ctrl.updateStatus)
router.put('/:id/review', verifyToken, ctrl.addReview)
router.get('/myRequests', verifyToken, ctrl.getMyRequests)
router.get('/provider', verifyToken, ctrl.getProviderRequests)
router.get('/admin/stats', verifyToken, ctrl.adminStats)

module.exports = router