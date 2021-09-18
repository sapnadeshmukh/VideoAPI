
const connection=require('../database/connection')
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
// const jwtToken=require('./signup')
// const jwt = require('jsonwebtoken');
const {tokenData ,authenticateToken}=require('../middleware/createToken')




module.exports.login=async (req, res) => {
    var email=req.body.email;
    var password=req.body.password;
    connection.query("SELECT * FROM loginSignup WHERE email = '"+ email +"'", async function(err, result, field){
        console.log(result)
        if (err) {
            res.send({
              "code":400,
              "failed":"error ocurred"
            })
        }else{
            if(result.length >0){
                const plainPassword = req.body.password
                const hashedPassword = result[0].password

                const comparePassword = await bcrypt.compare(plainPassword, hashedPassword)
                if(comparePassword){
                    console.log("Login succesfully!!")
                    res.send({
                        "code":200,
                        "success":"login sucessfully"
                    })
                    const Data = { email: req.body.email }
                    const accessToken = tokenData(Data, process.env.SECRETKEY,{expiresIn: "24h"})
                    console.log("Token =",accessToken)
                    // res.cookie("key=", accessToken);
                    // console.log(accessToken );
                }
                else{
                    console.log("Email and password does not match")
                    res.send({
                        "code":204,
                        "success":"Email and password does not match"
                    })
                }
                }
            else{
                console.log("Email does not exists")
                res.send({
                    "code":206,
                    "success":"Email does not exits"
                    });
                }
            }
        });
    
}

