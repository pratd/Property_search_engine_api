const Office = require('../models/office');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', { useNewUrlParser: true , useUnifiedTopology: true });

const offices = [{
	_id: 201,
	name:"some desc",
	photos:["photo.png"],
	description:"some desc long",
	user_id:101,
	kind:"private",
	location:"41.3743,2.1759",
	price:12000,
	lift:0,
	pets_allowed:1,
	"air-conditioning":1,
	terrace: 0,
	bargain:0
  },
  {
	  _id: 202,
	"name":"some desc",
	"photos":["photo.png"],
	"description":"some desc long",
	"user_id":101,
	"kind":"private",
	"location":"41.3743,2.1759",
	"price":12000,
	"lift":0,
	"pets_allowed":1,
	"air-conditioning":1,
	"terrace": 0,
	"bargain":0
  },{
	  _id:203,
	"name":"some desc",
	"photos":["photo.png"],
	"description":"some desc long",
	"user_id":102,
	"kind":"private",
	"location":"41.3743,2.1759",
	"price":12000,
	"lift":0,
	"pets_allowed":1,
	"air-conditioning":1,
	"terrace": 0,
	"bargain":0
  }
]

function deleteAllOffices() {
	return Office.deleteMany({})
		.then(() => {
			console.log('Deleted all offices');
		})
		.catch((err) => {
			console.log('Failed to delete all offices');
			return Promise.reject(err);
		});
}

deleteAllOffices();

Office.create(offices, (err, offices) => {
	if (err) {
		throw (err);
	}
	console.log('Success', offices);
	mongoose.connection.close();
});