const express = require('express');
const connection=require('../database/connection')
const {authenticateToken}=require('../middleware/createToken')


const multer = require('multer');
const path = require('path');
const router = express.Router()

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'images', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
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
    
    // To store  image in Database
    module.exports.allfile=(req, res) => {

    var token = req.headers.cookie
    var TOKEN=token.split(';')
    console.log(TOKEN[0]);
        
        if(token!=undefined){
            const data=authenticateToken(TOKEN[0],process.env.SECRETKEY)


            let sql="UPDATE loginSignup SET image='" +req.file.filename+ "'WHERE id="+ req.params.id;
                let quary = connection.query(sql,(err,result)=>{
                    if(err) throw err
                    console.log(req.file)

                    console.log("image added successfully in DB!!")
                    res.send("image added suceefully in DB!!!")
                })
        }else{
            console.log("No use found")
        }

}


// To view Image
module.exports.get_single_image=(req,res)=> {
    let sql = "SELECT image FROM loginSignup WHERE id=" + req.params.id;
    var query = connection.query(sql,(err,data)=>{
        if(err) throw e
        console.log(data[0])
        const result = Object.values(JSON.parse(JSON.stringify(data[0])));
        console.log(result[0])
        res.sendFile(`/home/sapna/Desktop/VideoAPI/images/${result[0]}`)


        
    })
}


// // To Upload Video
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


// To store  video in Database

module.exports.allvideo=(req, res) => {
    console.log(req.file.filename)
    console.log(typeof(req.file.filename))
    let sql="UPDATE loginSignup SET video='" +req.file.filename+ "'WHERE id="+ req.params.id;
        let quary = connection.query(sql,(err,result)=>{
            if(err) throw err
            console.log(req.file)

            console.log("video added successfully in DB!!")
            res.send("video added successfully in DB!!!")
        })

}



//  To watch video
    module.exports.get_single_video=(req,res)=> {
        let sql = "SELECT video FROM loginSignup WHERE id=" + req.params.id;
        var query = connection.query(sql,(err,data)=>{
            if(err) throw e
            const result = Object.values(JSON.parse(JSON.stringify(data[0])));
            res.sendFile(`/home/sapna/Desktop/VideoAPI/videos/${result[0]}`)


            
        })
    }

// To upload pdf

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

// To store  pdf in Database
module.exports.allPdf=(req, res) => {
    console.log(req.file.filename)
    console.log(typeof(req.file.filename))
    let sql="UPDATE loginSignup SET pdf='" +req.file.filename+ "'WHERE id="+ req.params.id;
        let quary = connection.query(sql,(err,result)=>{
            if(err) throw err
            console.log(req.file)

            console.log("pdf added successfully in DB!!")
            res.send("pdf added suceefully in DB!!!")
        })

}


// To  view Pdf
module.exports.get_single_pdf=(req,res)=> {

    let sql = "SELECT pdf FROM loginSignup WHERE id=" + req.params.id;
    var query = connection.query(sql,(err,data)=>{
        if(err) throw e
        const result = Object.values(JSON.parse(JSON.stringify(data[0])));
        res.sendFile(`/home/sapna/Desktop/VideoAPI/pdf/${result[0]}`)


        
    })
}