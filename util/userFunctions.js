const Boom = require('boom');
const User = require('../models/user');

async function verifyUniqueUser (req, res){
    //TODO finding the entry in database that matches
    //TODO either email or username

    const user = await User.findOne({
        $or:[
            {email: req.payload.email},
            {username: req.payload.username}
        ]
    });
    //!check whether the username or email
    //!is already taken and error out if so
    if(user){
        if(user.username === req.payload.username){
            throw (Boom.badRequest('Username taken'));
        }
        if(user.email === req.payload.email){
            throw (Boom.badRequest('Email exists'));
        }
    }
    
    //if everything checks out send the payload through
    //the route handler
    return res.response(req.payload);
}
//TODO: verify credentials after loggedIn

function verifyCredentials(req, res ){
    const password = req.payload.password;
    //finding the entry from database that 
    //matched either the email or username
    User.findOne({
        $or:[
            { email: req.payload.email},
            {username: req.payload.username}
        ]
    },(err,user) => {
        if(user){
            bcrypt.compare(password, user.password, (err, isValid) =>{
                if(isValid){
                    req(user);
                }
                else {
                    res.response(Boom.badRequest('Incorrect password! '));
                }
            });
        }
        else {
            res.response(Boom.badRequest('Incorrect username or email!'));
        }
    });
}
module.exports = {
    verifyUniqueUser : verifyUniqueUser,
    verifyCredentials: verifyCredentials
};