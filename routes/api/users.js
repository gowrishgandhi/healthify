 const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Doctor = require('../../models/Doctor');

// @route    POST api/users
// @desc     Register user
// @access   Public

router.post(
    '/changepass', [
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),    

    ], 
    
    async (req, res) => {
      console.log("In change password " + req.body);
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, password, ltype } = req.body;
      
      console.log(req.body);

      var user = null;
  
      if(ltype == "P") {
            user = await User.findOneAndUpdate(
                      { 'username': username }, 
                      { $set: {'password': password}}
                  );
      }

      if(ltype == "D") {
        user = await Doctor.findOneAndUpdate(
                  { 'email': username }, 
                  { $set: {'password': password}}
              );
      }
        
      return res.json( user );
  
  
        //const salt = await bcrypt.genSalt(10);
  
        //user.password = await bcrypt.hash(password, salt);
    }
  
);

router.post(
  '/reg',
  [
    check('username', 'Name is required')
      .not()
      .isEmpty(),

      check('mobile', 'Mobile number is required')
      .not()
      .isEmpty(),
    
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),    
     
  ],
  async (req, res) => {
    console.log("In Server" + req.body);
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, age, password, name, bg, city, ltype, mobile  } = req.body;
    console.log(req.body);

    let user = await User.findOne({ 'username': username });
      
            if (user) {
              console.log("Patient already registered");
              return res
                .status(400)
                .json({ errors: [{ msg: 'Already registered' }] });
            }

      user = new User({        
        username,           
        password,        
        name, age, bg, city, ltype, mobile
      });

      //const salt = await bcrypt.genSalt(10);

      //user.password = await bcrypt.hash(password, salt);

      await user.save();

      console.log("patient added " + username);

      const payload = {
        user: {
          id: user._id,
          ltype: user.ltype
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
  }
  
);


module.exports = router;
