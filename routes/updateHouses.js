const HouseModel = require('../models/homes');
const updateHouseSchema = require('../schemas/verifyHouse').verifyHouseSchema;
const Boom = require('boom');
module.exports ={
    method: "PUT",
    path:'/update/houses/{id}',
    config:{
        handler: async(req, res)=>{
            try{
                //getting the photos first
                const data = req.payload;
                const photosArray = [];
                if (data.photos) {
                    if (!Array.isArray(data.photos)) {
                        data.photos = [data.photos];
                    }
                data.photos.forEach((photo) => {
                    const phototoSave = {
                        name: photo.hapi.filename,
                        path: __dirname + "/../uploads/" + photo.hapi.filename,
                    };
                    photosArray.push(phototoSave);
                    const file = fs.createWriteStream(
                        __dirname + "/../uploads/" + photo.hapi.filename
                    );
                    file.on("error", (err) => console.error(err));
                    photo.pipe(file);
                    photo.on("end", (err) => {
                        const ret = [
                            {
                                filename: photo.hapi.filename,
                                headers: photo.hapi.headers,
                            },
                        ];
                        return JSON.stringify(ret);
                    });
                });
            }
            let photosArrayToSave = photosArray.map((photo) => {
                return photo.name;
            });
            const definitiveArray = [];
            photosArrayToSave = photosArrayToSave.forEach((filename) => {
                definitiveArray.push(`${server.info.uri}/uploads/${filename}`);
            });
            let result = await HouseModel.findByIdAndUpdate({_id:req.params.id},
                    {$push: {"photos":definitiveArray}},
                    req.payload,{new:true});
                    return res.response(result);
            }catch (error){
                console.log(req.params.id, req.payload.images);

                return Boom.badRequest('Unexpected Input!');
            }
            // console.log(req.payload);
            // return 'i have a stream';
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