const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'ThisIsSomeSecretText';

// ROUTE # 01
// Create a user using: POST '/api/auth/createuser'. No Login required
router.post('/createuser', 
[
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),
],
async (req, res) => {
  // If errors, return Bad Request and errors
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try{
    // Check if user already exist with the same email address
    let user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({success, error: 'Sorry a user already exist with this email'});
    }

    // create secure password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    // create new user    
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    });

    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    console.log(authToken);
    success = true;
    
    // res.json(user);
    res.json({success, authToken});
  }
  catch(error) {
    console.log(error.message);
    res.status(500).send('Internal Server Error');
  }
  
});

// ROUTE # 02
// Authenticate a user: POST "/api/auth/login" - No Login required
router.post('/login',
  [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],

  async (req, res) => {
    // If errors, return Bad Request and errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});
      if(!user) {
        return res.status(400).json({ success, error: "Please enter correct credentials"});
      }

      const passwordCompared = await bcrypt.compare(password, user.password);
      if(!passwordCompared) {
        return res.status(400).json({success, error: "Please enter correct credentials"});
      }

      const data = {
        user: {
          id: user.id
        }
      }
  
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;     
      res.json({success, authToken});

    }
    catch(error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }

  }
);

// ROUTE # 03
// Get User logged in details using POST: "/api/auth/getuser" - Login Required
router.post('/getuser',
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      const user = await User.findById(userId).select('-password');
      res.send(user);
    }
    catch(error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);


module.exports = router;