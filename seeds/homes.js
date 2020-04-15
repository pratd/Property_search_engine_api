const Home = require('../models/homes');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const homes = [{
		_id:301,
		"name": "some desc",
		"photos": ['img.png'],
		"description": "some desc long",
		"kind": "flat",
		"location": [41.3743,2.1759],
		"user_id": 101,
		"bedrooms": "more",
		"bathrooms": "2",
		"kitchen": "fully fitted",
		"condition": "new",
		"price": 1200,
		"lift": 0,
		"pets_allowed": 1,
		"garden": 0,
		"swimming_pool": 0,
		"air_conditioning": 1,
		"heating": 0,
		"floor": "3rd floor",
		"orientation": "N",
		"energy_certificate": "C",
		"parking": "Included for extra 100€",
		"bargain": 0
	},
	{	
		_id:302,
		"kind": "home",
		"name": "some desc",
		"photos": ['img.png'],
		"description": "some desc long",
		"location":  [41.3743,2.1759],
		"user_id": 102,
		"bedrooms": "more",
		"bathrooms": "2",
		"kitchen": "fully fitted",
		"condition": "new",
		"price": 1200,
		"lift": 0,
		"pets_allowed": 1,
		"garden": 0,
		"swimming_pool": 0,
		"air_conditioning": 1,
		"heating": 0,
		"floor": "3rd floor",
		"orientation": "N",
		"energy_certificate": "C",
		"parking": "Included for extra 100€",
		"bargain": 0
	},
	{
		_id:303,
		"kind": "duplex",
		"name": "some desc",
		"photos": ['img.png'],
		"description": "some desc long",
		"location":  [41.3743,2.1759],
		"user_id": 103,
		"bedrooms": "more",
		"bathrooms": "2",
		"kitchen": "fully fitted",
		"condition": "new",
		"price": 1200,
		"lift": 0,
		"pets_allowed": 1,
		"garden": 0,
		"swimming_pool": 0,
		"air_conditioning": 1,
		"heating": 0,
		"floor": "3rd floor",
		"orientation": "N",
		"energy_certificate": "C",
		"parking": "Included for extra 100€",
		"bargain": 0
	},
	{
		_id:304,
		"kind": "flat",
		"name": "some desc",
		"photos": ['img.png'],
		"description": "some desc long",
		"location":  [41.3743,2.1759],
		"user_id": 101,
		"bedrooms": "more",
		"bathrooms": "2",
		"kitchen": "fully fitted",
		"condition": "new",
		"price": 1200,
		"lift": 0,
		"pets_allowed": 1,
		"garden": 0,
		"swimming_pool": 0,
		"air_conditioning": 1,
		"heating": 0,
		"floor": "3rd floor",
		"orientation": "N",
		"energy_certificate": "C",
		"parking": "Included for extra 100€",
		"bargain": 0
	},
	{
		_id:305,
		"kind": "home",
		"name": "some desc",
		"photos": ['img.png'],
		"description": "some desc long",
		"location": [41.3743,2.1759],
		"user_id": 103,
		"bedrooms": "more",
		"bathrooms": "2",
		"kitchen": "fully fitted",
		"condition": "new",
		"price": 1200,
		"lift": 0,
		"pets_allowed": 1,
		"garden": 0,
		"swimming_pool": 0,
		"air_conditioning": 1,
		"heating": 0,
		"floor": "3rd floor",
		"orientation": "N",
		"energy_certificate": "C",
		"parking": "Included for extra 100€",
		"bargain": 0
	},
	{
		_id:306,
		"kind": "home",
		"name": "some desc",
		"photos": ['img.png'],
		"description": "some desc long",
		"location":  [41.3743,2.1759],
		"user_id": 102,
		"bedrooms": "more",
		"bathrooms": "2",
		"kitchen": "fully fitted",
		"condition": "new",
		"price": 1200,
		"lift": 0,
		"pets_allowed": 1,
		"garden": 0,
		"swimming_pool": 0,
		"air_conditioning": 1,
		"heating": 0,
		"floor": "3rd floor",
		"orientation": "N",
		"energy_certificate": "C",
		"parking": "Included for extra 100€",
		"bargain": 0
	},
	{
		_id:307,
		"kind": "home",
		"name": "some desc",
		"photos": ['img.png'],
		"description": "some desc long",
		"location":  [41.3743,2.1759],
		"user_id": 101,
		"bedrooms": "more",
		"bathrooms": "2",
		"kitchen": "fully fitted",
		"condition": "new",
		"price": 1200,
		"lift": 0,
		"pets_allowed": 1,
		"garden": 0,
		"swimming_pool": 0,
		"air_conditioning": 1,
		"heating": 0,
		"floor": "3rd floor",
		"orientation": "N",
		"energy_certificate": "C",
		"parking": "Included for extra 100€",
		"bargain": 0
	}
]

function deleteAllHomes() {
	return Home.deleteMany({})
		.then(() => {
			console.log('Deleted all homes');
		})
		.catch((err) => {
			console.log('Failed to delete all homes');
			return Promise.reject(err);
		});
}

deleteAllHomes();

Home.create(homes, (err, homes) => {
	if (err) {
		throw (err);
	}
	console.log('Success', homes);
	mongoose.connection.close();
});