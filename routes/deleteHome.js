const HomeModel = require('../models/home');
const UserModel = require('../models/user');
const Boom = require('boom');

module.exports={
    method: "DELETE",
    path:"/home/delete/{id}",
    config: {
        handler: async (req, res)=>{
            try{
                let result = await HomeModel.findByIdAndUpdate(req.params.id);
                // TODO: delete property ids from users
                await UserModel.findByIdAndUpdate({_id:result._id},{$pull:{property_ids:req.params.id}}, {new : true});
                //TODO: delete the image file from deletePhotos
                return res.response(result);
            }catch(error){
                return Boom.badRequest('Unexpected Input!');
            }
        },
        // auth: {
        //     strategy: 'jwtokenization',
        //     scope: ['user','admin']
        // },
        payload:{
            allow: ['application/json', 'multipart/form-data', 'image/jpeg', 'application/pdf', 'application/x-www-form-urlencoded'],
            multipart: true,
        }
    }
};