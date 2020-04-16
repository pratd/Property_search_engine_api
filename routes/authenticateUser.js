const Boom = require('boom');
const User = require('../models/user');
const authenticateUserSchema = require('../schemas/authenticateUser');
const verifyCredentials = require('../util/userFunctions').verifyCredentials;
const createToken = require('../util/token');

module.exports ={
    method: 'POST',
    path:'/login/users/authenticate',
    config :{
        //check user's password against DB
        pre:[
            {method: verifyCredentials, assign: 'user'}
        ],
        handler: (req, res) => {
            //if the password is correct we issue a token
            // if incorrect, the error will bubble up from the pre method
            res({id_token: createToken(req.pre.user)}).code(201);
        },
        validate:{
            payload: authenticateUserSchema
        }
    }
}