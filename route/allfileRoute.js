const express = require('express')
const router = express.Router()
const allfileController = require('../controller/allfile')
// require('../controller/allfile')




router.post('/uploadImage/:id',allfileController.imageUpload.single('image'), allfileController.allfile)
router.get('/getuploadImage/:id',allfileController.imageUpload.single('image'), allfileController.get_single_image)

router.post('/uploadVideo',allfileController.videoUpload.single('video'), allfileController.allfile)
router.post('/uploadpdf',allfileController.pdfUpload.single('pdf'), allfileController.allfile)




module.exports = router