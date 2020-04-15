module.exports = {
    method: "GET",
    path: "/",
    handler: async (req, res) => {
        return res.response('Welcome to Lookhaus\'s dark side!');
    }

};