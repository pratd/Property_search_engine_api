const Office = require('../models/offices');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', { useNewUrlParser: true , useUnifiedTopology: true });


const offices = [{
		"id": 1,
		"avatar": "../img",
		"username": "lorem",
		"email": "loremipsum@gmail.com",
		"password": "1",
		"property_id": 1,
		"role": "admin"
	},
	{
		"id": 2,
		"avatar": "../img",
		"username": "lorem",
		"email": "loremipsum@gmail.com",
		"password": "2",
		"property_id": 2,
		"role": "admin"
	},
	{
		"id": 3,
		"avatar": "../img",
		"username": "lorem",
		"email": "loremipsum@gmail.com",
		"password": "3",
		"property_id": 3,
		"role": "admin"
	}
]

function deleteAllOffices() {
	return Office.deleteMany({})
		.then(() => {
			console.log('Deleted all the offices');
		})
		.catch((err) => {
			console.log('Failed to delete all offices');
			return Promise.reject(err);
		});
}

deleteAllOffices();

Office.create(offices, (err, users) => {
	if (err) {
		throw (err);
	}
	console.log('Success', offices);
	mongoose.connection.close();
});