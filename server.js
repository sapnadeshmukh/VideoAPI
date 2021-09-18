const express=require('express')
const app=express()
app.use(express.json())
require('dotenv').config()

app.use('',require('./route/index'))
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})




