const express = require('express');
const connection=require('../database/connection')

const multer = require('multer');
const path = require('path');
const router = express.Router()

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'images', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000   // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {     // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})  
    module.exports.imageUpload=imageUpload
// For Single image upload
    module.exports.allfile=(req, res) => {
        
        // let sql="UPDATE loginSignup SET image='" +req.file+ "'WHERE id="+ req.params.id;
        // let quary = connection.query(sql,(err,result)=>{
        //     if(err) throw err
        //     console.log("image added successfully!!")
        //     // res.send("image added suceefully!!!")
        // })
    console.log(req.file.filename)
    // console.log(imageUpload.single('image'))
    let sql="UPDATE loginSignup SET image='" +req.file.filename+ "'WHERE id="+ req.params.id;
        let quary = connection.query(sql,(err,result)=>{
            if(err) throw err
            console.log("image added successfully!!")
            // res.send("image added suceefully!!!")
        })
    res.send(req.file)

}
// ---------------------------------

// For Multiple image uplaod
// router.post('/uploadBulkImage', imageUpload.array('images', 4), (req, res) => {
//     res.send(req.files)
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

// // ---------------------------------------------------------------------------- //

// // Video Upload
const videoStorage = multer.diskStorage({
    destination: 'videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
        fileSize: 15000000   // 15000000 Bytes = 15 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(mp4|MPEG-4)$/)) {     // upload only mp4 and mkv format
            return cb(new Error('Please upload a Video'))
        }
        cb(undefined, true)
    }
})

module.exports.videoUpload=videoUpload;

// module.exports.getfile=(req, res) => {
        
//     let sql="UPDATE loginSignup SET image='" +req.file+ "'WHERE id="+ req.params.id;
//     let quary = connection.query(sql,(err,result)=>{
//         if(err) throw err
//         console.log("image added successfully!!")
//         // res.send("image added suceefully!!!")
//     })
// // console.log(req)
//     res.send(req.file)
// }


module.exports.get_single_image=(req,res)=> {
    let sql = "SELECT * FROM loginSignup WHERE image=" + req.params.id;
    var query = connection.query(sql,(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
}


// -------------------------


const pdfStorage = multer.diskStorage({
    destination: 'pdf', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
});

const pdfUpload = multer({
    storage: pdfStorage,
    limits: {
        fileSize: 10000000   // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf)$/)) {     // upload only mp4 and mkv format
            return cb(new Error('Please upload a pdf'))
        }
        cb(undefined, true)
    }
})

module.exports.pdfUpload=pdfUpload;