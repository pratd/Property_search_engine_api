const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', { useNewUrlParser: true , useUnifiedTopology: true });


const users = [{
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

function deleteAllUsers() {
	return User.deleteMany({})
		.then(() => {
			console.log('Deleted all users');
		})
		.catch((err) => {
			console.log('Failed to delete all users');
			return Promise.reject(err);
		});
}

deleteAllUsers();

User.create(users, (err, users) => {
	if (err) {
		throw (err);
	}
	console.log('Success', users);
	mongoose.connection.close();
});
