var current_users= []; 
module.exports = { 
	create: function(req,res){ 
		if (req.body.name){	 
			var unique = current_users.find(function(user){ 
				return(req.body.name === user); 
			}) 
			if (unique === undefined){ 
				current_users.push(req.body.name); 
				res.json({current_user: current_users[(current_users.length-1)]}); 
			} else { 
				res.json({error: ("User " + unique + " is already logged in.  Please pick a unique user name.")}); 
			}  
		} else { 
			res.json({error: "No user name provided."}) 
		} 
	}, 
	verify: function(req,res){ 
		var login_status = current_users.find(function(user){ 
			return (req.params.id === user); 
		}); 
		if (login_status === undefined){ 
			login_status = false; 
		} 
		res.json({login_status: login_status}); 
	}, 
	delete: function(req,res){ 
		for (i=0; i<current_users.length; i++){ 
			if (req.params.id === current_users[i]){ 
				res.json({logged_out: current_users.splice(i, 1)});
			}
		} 
		res.json({error: "Error logging out: user not logged in to start with."}); 
	} 
} 
