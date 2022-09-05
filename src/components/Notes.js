import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <div>
      <h1>Your Notes</h1>
        {notes.map((note) => {
          return (
            <NoteItem note={note}/>
          );
        })}
    </div>
  );
};

export default Notes;
