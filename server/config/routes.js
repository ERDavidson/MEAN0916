var users = require('./../controllers/users.js'); 
var bids = require('./../controllers/bids.js'); 
module.exports = function(app){ 
	app.post('/users/create', function(req,res){ 
		users.create(req,res); 
	}); 
	app.get('/users/:id/verify', function(req,res){ 
		users.verify(req,res); 
	}); 
	app.post('/users/:id/delete', function(req,res){ 
		users.delete(req,res); 
	}); 
	app.get('/bids', function(req,res){ 
		bids.index(req,res); 
	}); 
	app.post('/bids/create', function(req,res){ 
		bids.create(req,res); 
	}); 
	app.post('/bids/delete', function(req,res){ 
		console.log("in routes delete");
		bids.delete(req,res); 
	}); 
	app.post('/bids/:id/update', function(req,res){ 
		bids.update(req,res); 
	}); 
	app.post('/bids/end', function(req,res){
		bids.end(req,res);
	});
} 
