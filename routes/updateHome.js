const HouseModel = require('../models/home');
const updateHouseSchema = require('../schemas/verifyHouse').updateHouseSchema;
const Boom = require('boom');
const getPhotoArray = require('../util/getPhotos').getPhotos;
const deletePhotoArray = require('../util/getPhotos').deletePhotos;
const fs = require('fs');
const util = require("util");
module.exports ={
    method: "PUT",
    path:'/home/update/{id}',
    config:{
        handler: async(req, res)=>{

            //TODO: getting the photos first to push
            let arraytoPush = await Promise.resolve(getPhotoArray(req));
            let arraytoDelete = await Promise.resolve(deletePhotoArray(req));

            const readFile = util.promisify(fs.readFile);
            if(arraytoPush && arraytoDelete){
                if (!Array.isArray(arraytoPush)) {
                    arraytoPush = [arraytoPush];
                }
                if (!Array.isArray(arraytoDelete)) {
                    arraytoDelete = [arraytoDelete];
                }
                const photoArrayAdd =[];
                for (const photo of arraytoPush) {
                    const read = await readFile(photo.path);
                    photoArrayAdd.push(read);
                }
                const photoArrayRemove =[];
                for (const photo of arraytoDelete) {
                    const read = await readFile(photo.path);
                    photoArrayRemove.push(read);
                }
                //* Updating the houseModel
                var arrayPhoto = [{photo:{data:[], contentType:null}}];
                var arrayDelete = [{photo:{data:[], contentType:null}}];
                photoArrayAdd.forEach(img => {
                    arrayPhoto.push({
                        photo:{
                            data: img,
                            contentType:"img/jpg"
                        }
                    });
                });
                photoArrayRemove.forEach(img => {
                    arrayDelete.push({
                        photo:{
                            data: img,
                            contentType:"img/jpg"
                        }
                    });
                });
                try{
                    //*update photos first
                    //if the field dont exist 
                    console.log(arrayPhoto);
                    await HouseModel.findByIdAndUpdate({_id:req.params.id},
                        {$push: {photos: arrayPhoto}} ,{new:true});
                    if (req.payload.photos){
                        req.payload.photos=undefined;
                    }
                    //*final update after pushing the photos
                    await HouseModel.findByIdAndUpdate(req.params.id,req.payload,{new:true,omitUndefined:true});
                    //* delete what is not required
                    let result = await HouseModel.findByIdAndUpdate({_id:req.params.id},{$pullAll: {photos: photoArrayRemove}}, {new : true});
                    return res.response(result);
                }catch (error){
                    return Boom.badRequest('Unexpected Input!');
                }
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