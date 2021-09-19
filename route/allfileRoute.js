const express = require('express')
const router = express.Router()
const allfileController = require('../controller/allfile')




router.post('/uploadImage/:id',allfileController.imageUpload.single('image'), allfileController.allfile)
router.get('/getuploadImage/:id',allfileController.imageUpload.single('image'), allfileController.get_single_image)

router.post('/uploadVideo/:id',allfileController.videoUpload.single('video'), allfileController.allvideo)
router.get('/getuploadVideo/:id',allfileController.videoUpload.single('video'), allfileController.get_single_video)


router.post('/uploadpdf/:id',allfileController.pdfUpload.single('pdf'), allfileController.allPdf)
router.get('/getuploadpdf/:id',allfileController.pdfUpload.single('pdf'), allfileController.get_single_pdf)


module.exports = router