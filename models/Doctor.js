const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    dept: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        default: "doctor123"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    posi: {
        type: String,
        required: true
    },

    quali: {
        type: String,
        required: true
    },
    
    exp: {
        type: Number,
        required: true
    },

    mobile: {
        type: Number,
        required: true
    },
 
    ltype: {type: String, required: true, default: "D"}

});

module.exports = Doctor = mongoose.model("doctor", doctorSchema);
