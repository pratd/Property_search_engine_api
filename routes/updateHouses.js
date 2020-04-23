const HouseModel = require('../models/homes');
const updateHouseSchema = require('../schemas/verifyHouse').verifyHouseSchema;
const Boom = require('boom');
const getPhotoArray = require('../util/getPhotos');
module.exports ={
    method: "PUT",
    path:'/home/update/{id}',
    config:{
        handler: async(req, res)=>{

            //getting the photos first
            const definitiveArray = await getPhotoArray(req);
            try{
                let result = await HouseModel.findByIdAndUpdate({"_id":req.params.id}, 
                    {$push: {"photos":{ $each: definitiveArray}}}, req.payload,{new:true});
                return res.response(result);
            }catch (error){
                console.log(req.params.id);
                return Boom.badRequest('Unexpected Input!');
            }
            // console.log(req.payload);
            // return 'i have a stream';
        },
        // Add authentication to this route
        // The user must have a scope of `admin`
        // auth: {
        //     strategy: 'jwtokenization',
        //     scope: ['user']
        // },
        payload:{
        output: 'stream',
            parse: true,
            allow: ['application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
            multipart: true,
            maxBytes: 1024 * 1024*100,
            timeout: false,
        },
        validate:{
            payload: updateHouseSchema,
            failAction: (reques, resp, error)=>{
                return error.isJoi ? resp.response(error.details[0]).takeover() :
                resp.response(error).takeover();
            }
        }
    }
};