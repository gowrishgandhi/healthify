const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Contact = require('../../models/Contact');
const Doctor = require('../../models/Doctor');
const User = require('../../models/User');
const Appointments = require('../../models/Appointments');

const { check, validationResult } = require('express-validator');

  

router.post(
    '/create',
    [
      auth,
      [
        check('name', 'Name is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, mobile, exp, dept, quali, posi } = req.body;
  
      try {
      
          
      let found = await Doctor.findOne({'email': email});

      //console.log("found status ");
      //console.log(found);
      
      if(found === null) {
      
        const newContact = new Doctor({
          name,
          email,
          mobile, exp, dept, quali, posi
        });
  
        const contact = await newContact.save();

        console.log("inserted new record in doctor");  

        // var password = "doctor123"; var ltype = "D";
        
        // const newContact2 = new User({          
        //   email,
        //   password, ltype
        // });
  
        // const contact2 = await newContact2.save();
        
        // console.log("created login for doctor");

        res.json(contact);
      }
      


      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );


   

router.post(
  '/bookapp',
  [
    auth,
    [
      check('demail', 'Doctor details is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { demail, pemail, doa, desc } = req.body;

    try {
    
        
    let doc = await Doctor.findOne({'email': demail});
    let pat = await User.findOne({'username': pemail});

    var pname = ""; var dname = ""; var dept = "";

    if(pat !== null)
     pname = pat.name;

    if(doc !== null) {
      dname = doc.name;
      dept = doc.dept;
    }


    const newAppoint = new Appointments({
      demail,
      pemail, pname, dname, dept,
      doa, desc
    });

    const contact = await newAppoint.save();

    console.log("inserted new record in appointments");     

    //console.log("found status ");
    //console.log(found);
    

      res.json(contact);
    
    


    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/getdoctors/:user_id', async (req, res) => {
    try {
        console.log("querying " + req.params.user_id);

        if(req.params.user_id === undefined)
          return res.json("initial query fail");

        var arr = {};

        let usr = await Doctor.find({ }).sort({"dept": 1});
        //console.log("found status " + cont);
        
        if(usr !== null)
          arr.docs = usr;
        else
          arr.docs = null;

        console.log(arr);

        return res.json(arr);
  

    } catch (err) {
      console.error("catched" + err.message);
      res.status(500).send('Server Error');
    }
  });

  
router.get('/getappoints/:user_id', async (req, res) => {
  try {
      console.log("querying " + req.params.user_id);

      if(req.params.user_id === undefined)
        return res.json("initial query fail");

      var arr = {};

      let usr = await Appointments.find({"pemail": req.params.user_id }).sort({"doa": 1});
      //console.log("found status " + cont);
      
      if(usr !== null)
        arr.apps = usr;
      else
        arr.apps = null;

      console.log(arr);

      return res.json(arr);


  } catch (err) {
    console.error("catched" + err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/getappointsdoctor/:user_id', async (req, res) => {
  try {
      console.log("querying " + req.params.user_id);

      if(req.params.user_id === undefined)
        return res.json("initial query fail");

      var arr = {};

      let usr = await Appointments.find({"demail": req.params.user_id }).sort({"doa": 1});
      //console.log("found status " + cont);
      
      if(usr !== null)
        arr.apps = usr;
      else
        arr.apps = null;

      console.log(arr);

      return res.json(arr);


  } catch (err) {
    console.error("catched" + err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;