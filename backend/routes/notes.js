const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');

// ROUTE # 01
// Get all notes using: GET '/api/notes/fetchallnotes' - Login Required
router.get('/fetchallnotes', 
  fetchuser,
  async (req, res) => {
    try {
      const notes = await Notes.find({user: req.user.id});
      res.json(notes);
    }
    catch(error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ROUTE # 02
// Add notes using: POST '/api/notes/addnote' - Login Required
router.post('/addnote', 
  fetchuser,
  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter valid description').isLength({min: 5}),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {title, description, tag} = req.body;
      const note = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    }
    catch(error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;