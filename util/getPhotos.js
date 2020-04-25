const fs = require("fs");
const server = require("../index.js");
async function getPhotos(req) {
  const data = req.payload;
  const photosArray = [];
  const wholePhotos = [];
  if (data.photos) {
    if (!Array.isArray(data.photos)) {
      data.photos = [data.photos];
    }
    data.photos.forEach((photo) => {
      if(req.params.id){
        
      }
      const phototoSave = {
        name: photo.hapi.filename,
        path: __dirname + "/../uploads/" + photo.hapi.filename,
      };
      photosArray.push(phototoSave);
      if (!fs.existsSync(__dirname + "/../uploads/")) {
        fs.mkdirSync(__dirname + "/../uploads/");
      }
      const file = fs.createWriteStream(
        __dirname + "/../uploads/" + photo.hapi.filename
      );
      wholePhotos.push(file);
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
  return wholePhotos;

  // let photosArrayToSave = photosArray.map((photo) => {
  //   return photo.name;
  // });
  // //photos to delete
  // const definitiveArray = [];
  // photosArrayToSave = photosArrayToSave.forEach((filename) => {
  //   definitiveArray.push(`${server.info.uri}/uploads/${filename}`);
  // });
  // return definitiveArray;
}
async function deletePhotos(req) {
  const data = req.payload;
  const photosArray = [];
  if (data.deletePhotos) {
    if (!Array.isArray(data.deletePhotos)) {
      data.deletePhotos = [data.deletePhotos];
    }
    data.deletePhotos.forEach((photo) => {
      const phototoSave = {
        name: photo.hapi.filename,
        path: __dirname + "/../deletePhotos/" + photo.hapi.filename,
      };
      photosArray.push(phototoSave);
      const file = fs.createWriteStream(
        __dirname + "/../deletePhotos/" + photo.hapi.filename
      );
      if (!fs.existsSync(__dirname + "/../deletePhotos/")) {
        fs.mkdirSync(__dirname + "/../deletePhotos/");
      }
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
  let photosArrayToDelete = photosArray.map((photo) => {
    return photo.name;
  });
  //photos to delete
  const definitiveDeleteArray = [];
  photosArrayToDelete = photosArrayToDelete.forEach((filename) => {
    definitiveDeleteArray.push(`${server.info.uri}/uploads/${filename}`);
  });
  return definitiveDeleteArray;
}
module.exports = {
  getPhotos: getPhotos,
  deletePhotos: deletePhotos,
};
