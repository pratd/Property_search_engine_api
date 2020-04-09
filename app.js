const Hapi = require("hapi");
const Joi = require("joi");
const Mongoose = require("mongoose");
Mongoose.connect("mongodb://127.0.0.1:27017");
const server = new Hapi.Server({"host":"localhost", "port":3000});
//create a test model
const UserModel = Mongoose.model("userCollection",{
    avatar:Object,
    username: String,
    password: String,
    email:String,
    property_id:Array,
    role:String
});

server.route({
    method:"POST",
    path:"/user",
    options:{
        validate:{
            payload:{
                userName: Joi.string().required(),
                password: Joi.string().required(),
                email:Joi.string().required(),
                property_id:Joi.array().required(),
                role:Joi.string().required()
            },
            failAction: (request, h, error)=> {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                
            }
        }
    },
    handler: async (request, h) => {
        try{
            var user = new UserModel(request.payload);
            var result = await user.save();
            return h.response(result);
        } catch(error){
            return h.response(error).code(500);
        }
    }
});