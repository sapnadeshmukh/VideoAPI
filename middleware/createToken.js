const jwt = require("jsonwebtoken")



// To create Token
const tokenData = (data, SecretKey) => {
    return jwt.sign(data, SecretKey)
}



// To verify Token
var authenticateToken =(token,SecretKey)=>{
    return jwt.verify(token,SecretKey)
    


}

module.exports = {tokenData ,authenticateToken}
