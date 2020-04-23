const Joi = require('joi');

const verifyOfficeSchema = Joi.object({
    "name":Joi.string().optional(),
	"photos": Joi.any().meta({swaggerType: 'file'}).description('file to upload').optional(),
	"deletePhotos":Joi.any().meta({swaggerType: 'file'}).description('file to upload').optional(),
	"description": Joi.string().optional(),
    "kind": Joi.string().optional(),
    "street":Joi.string().optional(),
    "city":Joi.string().optional(),
    "postalcode":Joi.string().optional(),
    "country":Joi.string().optional(),
    "lift":Joi.boolean().optional(),
    "pets_allowed":Joi.boolean().optional(),
    "price": Joi.number().optional(),
	"garden": Joi.boolean().optional(),
	"swimming_pool": Joi.boolean().optional(),
	"air_conditioning": Joi.boolean().optional(),
	"heating": Joi.boolean().optional(),
    "floor": Joi.string().optional(),
    "terrace":Joi.boolean().optional(),
	"energy_certificate": Joi.string().optional(),
	"parking": Joi.string().optional(),
	"bargain": Joi.boolean().optional()
});
module.exports ={
    updateOfficeSchema : verifyOfficeSchema
};