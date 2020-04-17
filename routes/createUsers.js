const bcrypt = require('bcrypt');
const Boom = require('boom');
const User = require('../models/user');
const createUserSchema = require('../schemas/createUser');
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;
const createToken = require('../util/token');

async function hashPassword(password){
    //generate a salt at level 10 strength
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject)=>{
        bcrypt.hash(password, saltRounds, function(err, hash){
            if(err)  reject(err);
            resolve(hash);
        });
    });
    return hashedPassword;
}

module.exports = {
    method: "POST",
    path: '/signup/users',
    config: {
       // before running the route handler, verify the user is unique
        pre:[
            {method: verifyUniqueUser}
        ],
        handler: async (req, res )=>{

            let user = new User();
            user.email = req.payload.email;
            user.username = req.payload.username;
            user.role = req.payload.role;

            const password = await hashPassword(req.payload.password, async(err,hash)=>{
                if(err){
                    throw Boom.badRequest(err);
                }
                user.password = hash;
                user.save( (err,user)=>{
                    if(err){
                        throw Boom.badRequest(err);
                    }
                    //if user is saved successfully, issue a JWT
                    res.response({ id_token: createToken(user)}).code(201);
                });
            });
        },
        // //validate the payload against the Joi schema
        validate:{
            payload: createUserSchema,
            //! show the error returned in the fields for POSTMAN
            failAction: (request, h, err) => {
                return err;
            }
        }
    }
};