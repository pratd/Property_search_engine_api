const fs = require("fs");
const server = require("../index.js");
const path = require("path");

module.exports = {
  method: "GET",
  path: "/upload/{name}",
  config: {
    //!This handler needs refactor
    handler: async (req, res) => {
      const filename = req.params.name;
      return res.file(filename);
    },
  },
};
