const Buyer = require('../models/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', { useNewUrlParser: true , useUnifiedTopology: true });


const buyers = [{
		_id: 401,
		"avatar": "../img",
		"username": "lorem",
		"email": "loremipsum@gmail.com",
		"password": "1",
		"property_id": [302, 303, 301],
		"role": "admin"
	},
	{
		_id: 403,
		"avatar": "../img",
		"username": "lorem",
		"email": "loremipsum@gmail.com",
		"password": "2",
		"property_id": [201],
		"role": "admin"
	},
	{
		_id: 404,
		"avatar": "../img",
		"username": "lorem",
		"email": "loremipsum@gmail.com",
		"password": "3",
		"property_id": [202,203],
		"role": "admin"
	}
]

function deleteAllBuyers() {
	return Buyer.deleteMany({})
		.then(() => {
			console.log('Deleted all users');
		})
		.catch((err) => {
			console.log('Failed to delete all users');
			return Promise.reject(err);
		});
}

deleteAllBuyers();

Buyer.create(buyers, (err, buyers) => {
	if (err) {
		throw (err);
	}
	console.log('Success', buyers);
	mongoose.connection.close();
});