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

// ROUTE # 03
// Update notes using: PUT '/api/notes/updatenote' - Login Required
router.put('/updatenote/:id',
  fetchuser,
  async (req, res) => {
    const {title, description, tag} = req.body;
    try {
      // create new note object
      const newNote = {};
      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tag){newNote.tag = tag};
  
      // Find the note to be updated
      let note = await Notes.findById(req.params.id);
      if(!note){ return res.status(404).send('Not Found')}
  
      if(note.user.toString() !== req.user.id) {
        return res.status(401).send('Not Allowed');
      }
  
      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
      res.json({note});
    }
    catch(error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ROUTE # 04
// Delete notes using: DELETE '/api/notes/deletenote' - Login Required
router.delete('/deletenote/:id',
  fetchuser,
  async (req, res) => {

    try {
      // Find the note to be delete
      let note = await Notes.findById(req.params.id);
      if(!note){ return res.status(404).send('Not Found')}
  
      // Delet if user own the note
      if(note.user.toString() !== req.user.id) {
        return res.status(401).send('Not Allowed');
      }
  
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({"Success": "Note has been deleted"});
    }
    catch(error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
