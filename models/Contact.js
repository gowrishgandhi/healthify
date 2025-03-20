const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  collegecode: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },  
  taluk: {
    type: String
  },
  district: {
    type: String
  },
  address: {
    type: String
  },
  pincode: {
    type: Number
  },
  fax: {
    type: String
  },  

});

module.exports = mongoose.model('contact', ContactSchema);