const Buyer_request = require('../models/buyers_requests');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', { useNewUrlParser: true , useUnifiedTopology: true });

const buyers_requests = [{
	_id:401,
	property_id:[201,202],
	seller_id:101,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	_id:402,
	property_id:[301, 304, 307],
	seller_id:101,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	_id:403,
	"property_id":[302,306],
	"seller_id":102,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	_id:404,
	"property_id":[305],
	"seller_id":103,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	_id:405,
	property_id:[203],
	"seller_id":102,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	_id:406,
	"property_id":[202],
	"seller_id":101,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	_id:407,
	"property_id":[307],
	"seller_id":101,
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
]

function deleteAllBuyersRequests() {
	return Buyer_request.deleteMany({})
		.then(() => {
			console.log('Deleted all buyer\'s requests');
		})
		.catch((err) => {
			console.log('Failed to deleted all buyer\'s requests');
			return Promise.reject(err);
		});
}

deleteAllBuyersRequests();

Buyer_request.create(buyers_requests, (err, buyers_requests) => {
	if (err) {
		throw (err);
	}
	console.log('Success', buyers_requests);
	mongoose.connection.close();
});