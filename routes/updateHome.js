const HouseModel = require('../models/home');
const updateHouseSchema = require('../schemas/verifyHouse').updateHouseSchema;
const Boom = require('boom');
const getPhotoArray = require('../util/getPhotos').getPhotos;
const deletePhotoArray = require('../util/getPhotos').deletePhotos;
module.exports ={
    method: "PUT",
    path:'/home/update/{id}',
    config:{
        handler: async(req, res)=>{

            //getting the photos first to push
            const arraytoPush = await getPhotoArray(req);
            const arraytoDelete = await deletePhotoArray(req);
            try{
                //*update photos first
                await HouseModel.findByIdAndUpdate({_id:req.params.id},{ $push: {photos: {$each: arraytoPush }}},{new:true});
                if (req.payload.photos){
                    req.payload.photos=undefined;
                }
                //*final update
                await HouseModel.findByIdAndUpdate(req.params.id,req.payload,{new:true,omitUndefined:true});
                //* delete what is not required
                let result = await HouseModel.findByIdAndUpdate({_id:req.params.id},{$pullAll:{photos: arraytoDelete}}, {new : true});
                return res.response(result);
            }catch (error){
                return Boom.badRequest('Unexpected Input!');
            }
        },
        // Add authentication to this route
        // The user must have a scope of `admin`
        auth: {
            strategy: 'jwtokenization',
            scope: ['user']
        },
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