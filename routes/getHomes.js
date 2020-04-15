const homeSchema = require("../models/homes");
module.exports={
    method: "GET",
    path: "/homes",
    handler: async (req, res) => {
        const filtering = {
            'kind': req.query.kind || '',
            'bedrooms': req.query.bedrooms || '',
            'bathrooms': req.query.bathrooms || '',
            'kitchen': req.query.kitchen || '',
            'conditions': req.query.conditions || ''
        };
        try{
            // await homeSchema.find({ kind: filtering.kind }, (err, homes) => {
            // 	if(err){
            // 		return res.response(error).code(500);
            // 	}else{
            // 		return res.response(homes);
            // 	}
            // });
            const homes = await homeSchema.find({ kind: filtering.kind });
            return res.response(homes);
        }catch(error){
            return res.response(error).code(500);
        }
    }
};