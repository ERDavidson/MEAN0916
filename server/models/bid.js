var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var BidSchema = new mongoose.Schema({ 
	amount: Number,
	_user: String, 
	_product: String, 
}, 
{ 
	timestamps: true 
}); 
BidSchema.path('_user').required(true, "Bid must be submitted by a logged-in user."); 
BidSchema.path('_product').required(true, "Bid must be for a product."); 
mongoose.model("Bid", BidSchema); 
