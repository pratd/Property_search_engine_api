const fs = require("fs");
const server = require("../index.js");
const path = require("path");
const util = require("util");

module.exports = {
  method: "GET",
  path: "/uploads",
  config: {
    //!This handler needs refactor
    handler: async (req, res) => {
      const readdir = util.promisify(fs.readdir);

      try {
        if (fs.existsSync(__dirname + "/../uploads/")) {
          const uploads = await readdir(__dirname + "/../uploads/");
          return res.response(uploads);
        } else {
          return res.response("Uploads dir doesn't exist yet");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
