const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema({
    pemail: {
        type: String,
        required: true
    },
    pname:
    {
        type: String, 
        required: true
    },
    dname:
    {
        type: String, 
        required: true
    },
    dept:
    {
        type: String, 
        required: true
    },
    demail: {
        type: String,
        required: true,        
    },
    doa: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },

    

});

module.exports = Appointments = mongoose.model("appoint", appointSchema);
