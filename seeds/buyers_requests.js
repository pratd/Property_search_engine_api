const Buyer_request = require('../models/buyers_requests');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', { useNewUrlParser: true , useUnifiedTopology: true });

const users = [{
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":'5e9059ef7a856cf23b825502',
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":2,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":2,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":2,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":2,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":2,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":2,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
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