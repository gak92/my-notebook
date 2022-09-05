import React, { useContext } from 'react';
import { useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(()=>{
    getNotes();
    // eslint-disable-next-line
  },[]);

  const updateNote = (note) => {
    console.log(note);
  };

  return (
    <div>
      <AddNote />
      <div className="row my-3">
        <h1>Your Notes</h1>
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote}/>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
