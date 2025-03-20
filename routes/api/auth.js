const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Doctor = require('../../models/Doctor');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
  try {

    //console.log(req.user.id);
    //console.log(req.user.ltype);
    var user = null;
    if(req.user.ltype == "P")
      user = await User.findById(req.user.id);
    if(req.user.ltype == "D")
      user = await Doctor.findById(req.user.id);
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [    
    check('password', 'Password is required').exists(),
    check('username', 'Email is required')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("in login");

    const { username, password, ltype } = req.body;

    try {      
      var user = null;
      if(ltype == "P")
        user = await User.findOne({ "username": username });
      if(ltype == "D")
        user = await Doctor.findOne({ "email": username });

      //console.log(user);
      console.log(username, password, ltype);

      if (!user) {
        console.log("user does not exist");
              return res
                .status(400)
                .json({ errors: [{ msg: 'Email ID wrong' }] });
      }      

      if (password !== user.password) {
        console.log("password wrong");
        return res
          .status(400)
          .json({ errors: [{ msg: 'Password wrong' }] });
      }

      const payload = {
        user: {
          id: user._id,
          ltype: ltype
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
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
