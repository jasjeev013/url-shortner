const jwt = require('jsonwebtoken');
const secret = "Jasjeev@123#$@"


const setUser = (user) => {
    const payload = user;
    return jwt.sign({
        _id:user._id,
        email:user.email,
        name: user.name,
        role: user.role,
    } ,secret);

}

const getUser = (token) => {
    if(!token){
        return null;
    }
    try {
        return jwt.verify(token,secret);
        
    } catch (error) {
        return null;
    }
    // return jwt.verify(token,secret);
}

module.exports = {
    setUser,
    getUser
}