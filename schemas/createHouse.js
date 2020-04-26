const Joi = require('joi');

const createHouseSchema = Joi.object({
    "name":Joi.string().required(),
	"photos": Joi.any().meta({swaggerType: 'file'}).description('file to upload').optional(),
	"deletePhotos":Joi.any().meta({swaggerType: 'file'}).description('file to upload').optional(),
	"description": Joi.string().optional(),
	"kind": Joi.string().required(),
    "street": Joi.string().required(),
    "city":Joi.string().required(),
    "postalcode":Joi.string().required(),
    "country":Joi.string().required(),
	"bedrooms": Joi.string(),
	"bathrooms": Joi.string(),
	"kitchen": Joi.string(),
	"condition": Joi.string(),
    "price": Joi.number().required(),
	"lift": Joi.boolean(),
	"pets_allowed": Joi.boolean(),
	"garden": Joi.boolean(),
	"swimming_pool": Joi.boolean(),
	"air_conditioning": Joi.boolean(),
	"heating": Joi.boolean(),
	"floor": Joi.string(),
	"orientation": Joi.string(),
	"energy_certificate": Joi.string(),
	"parking": Joi.string(),
	"bargain": Joi.boolean()
});
module.exports ={
    createHouseSchema : createHouseSchema
};