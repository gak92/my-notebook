const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


// Create a user using: POST '/api/auth/createuser'. No Login required
router.post('/createuser', 
[
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password must be atleast 5 character').isLength({ min: 5 }),

],
async (req, res) => {
  // If errors, return Bad Request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    // Check if user already exist with the same email address
    let user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({error: 'Sorry a user already exist with this email'});
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
    
    res.json(user);
  }
  catch(e) {
    console.log(e.message);
    res.status(500).send('Some error occured');
  }
  
});

module.exports = router;