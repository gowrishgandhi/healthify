const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},

	ltype: {type: String, required: true, default: "P"},

	age: {
		type: Number,
		required: true
	},
	bg: {
		type: String,
	
	},
	mobile: {
        type: Number,
        required: true
    },
 
	city: {
		type: String
	},

});

module.exports = User = mongoose.model("patient", UserSchema);
