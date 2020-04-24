const fs = require("fs");
const server = require("../index.js");
const path = require("path");

module.exports = {
  method: "GET",
  path: "/uploads",
  config: {
    //!This handler needs refactor
    handler: async (req, res) => {
      if (!fs.existsSync(__dirname + "/../uploads/")) {
        const uploads = fs.readdir(__dirname + "/../uploads/");
        return res.response(uploads);
      } else {
        return res.response("Uploads dir doesn't exist yet");
      }
    },
  },
};
