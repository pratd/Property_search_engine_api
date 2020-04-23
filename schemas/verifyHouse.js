const Joi = require('joi');

const verifyHouseSchema = Joi.object({
    "name":Joi.string().optional(),
	"photos": Joi.any().meta({swaggerType: 'file'}).description('file to upload').optional(),
	"deletePhotos":Joi.any().meta({swaggerType: 'file'}).description('file to upload').optional(),
	"description": Joi.string().optional(),
	"kind": Joi.string().optional(),
	//"location": [41.3743,2.1759],
	"bedrooms": Joi.string().optional(),
	"bathrooms": Joi.string().optional(),
	"kitchen": Joi.string().optional(),
	"condition": Joi.string().optional(),
    "price": Joi.number().optional(),
	"lift": Joi.boolean().optional(),
	"pets_allowed": Joi.boolean().optional(),
	"garden": Joi.boolean().optional(),
	"swimming_pool": Joi.boolean().optional(),
	"air_conditioning": Joi.boolean().optional(),
	"heating": Joi.boolean().optional(),
	"floor": Joi.string().optional(),
	"orientation": Joi.string().optional(),
	"energy_certificate": Joi.string().optional(),
	"parking": Joi.string().optional(),
	"bargain": Joi.boolean().optional()
});
module.exports ={
    updateHouseSchema : verifyHouseSchema
};