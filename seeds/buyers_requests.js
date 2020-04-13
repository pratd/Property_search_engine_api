const Buyer_request = require('../models/buyers_requests');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lookhaus', { useNewUrlParser: true , useUnifiedTopology: true });

const buyers_requests = [{
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":'5e9059ef7a856cf23b825502',
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":'5e9059ef7a856cf23b825502',
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":'5e9059ef7a856cf23b825502',
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
	"property_id":"5e943c073c6ce8c679632b05",
	"seller_id":'5e9059ef7a856cf23b825502',
	"buyer_name":"lorem ipsum",
	"buyer_email":"lorea@abc.com",
	"buyer_message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
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
	"seller_id":'5e9059ef7a856cf23b825502',
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