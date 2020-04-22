const User = require('../models/user');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', { useNewUrlParser: true , useUnifiedTopology: true });


const users = [{
		avatar: "../img",
		username: "lorem",
		email: "loremipsum@gmail.com",
		password: "1",
		property_ids: ['5e988e2189280c2746373c7a', '5e988e6aa831be2844cc3303'],
		role: "admin"
	},
	{
		avatar: "../img",
		username: "lorem1",
	    email: "loremipsum@gmail.com1",
		password: "2",
		property_ids: ['5e988e2189280c2746373c7e'],
		role: "user"
	},
	{
		avatar: "../img",
		username: "lorem2",
		email: "loremipsum@gmail.com2",
		password: "3",
		property_ids: ['5e988e2189280c2746373c7f'],
		role: "user"
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
