const fs = require('fs');
const server = require('../index.js');
async function getPhotos(req){
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
    //photos to delete
    const definitiveArray = [];
    photosArrayToSave = photosArrayToSave.forEach((filename) => {
        definitiveArray.push(`${server.info.uri}/uploads/${filename}`);
    });
    return definitiveArray;
}
module.exports = getPhotos;