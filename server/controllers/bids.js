var mongoose = require('mongoose'); 
var Bid = mongoose.model('Bid');
var ended = false;
module.exports = { 
	index: function(req,res){ 
		Bid.find({}, function(err, bid_list){ 
			if (err){ 
				console.log({error: "Error in bid index method: " + err}); 
			} else {
				res.json({bid_list: bid_list, ended: ended}); 
			} 
		}) 
	}, 
	create: function(req,res){ 
		if (ended){
			res.json({error: "Error: Bid has ended.", ended: ended});
		} else {
			Bid.find({_product: req.body.product}, function(err, prior_bids){
				var max_bid = 0;
				for (i=0; i<prior_bids.length; i++){
					if (prior_bids[i].amount > max_bid){
						max_bid = prior_bids[i].amount;
					}
				}
				if (req.body.amount > max_bid){
					var new_bid = new Bid({ 
						amount: req.body.amount,
						_user: req.body.user, 
						_product: req.body.product
					}); 
					new_bid.save(function(err){ 
						if (err){ 
							res.json({error: "Error saving new bid: " + err}); 
						} else { 
							res.json({result: "ok"}); 
						} 
					}) 
				} else {
					res.json({error: "New bid must exceed prior high bid of " + max_bid + "."});
				}
			})
		}
	},
	end: function(req,res){
		ended = req.body.ended;
		if (ended) {
			res.json({ended: ended});
			console.log(ended + " ended the bidding.");
		} else {
			res.json({error: "Failed to register end of bid"});
		}
	},
	delete: function(req,res){ 
		Bid.remove({}, function(err, old_bids){ 
			if (err) { 
				res.json({error: "Error deleting bids: " + err}); 
			} else { 
				ended = false;
				res.json({result: "ok"}); 
			} 
		}) 
	}
} 
