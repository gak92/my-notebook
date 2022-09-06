import React from 'react';
import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const BASE_URL = 'http://localhost:5000';
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  // Fetch All Notes
  const getNotes = async () => {
    const REQUESTED_URL = `${BASE_URL}/api/notes/fetchallnotes`;
    const response = await fetch(REQUESTED_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const parseData = await response.json();
    console.log(parseData);
    setNotes(parseData);
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    console.log('Adding a new note...');
    const REQUESTED_URL = `${BASE_URL}/api/notes/addnote`;
    const response = await fetch(REQUESTED_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const parseData = await response.json();
    console.log(parseData);
    // const note = {
    //   "_id": "6314a3a5aff4810cdca1b8c6",
    //   "user": "631468d76bc11f312a96f898",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-09-04T13:09:57.211Z",
    //   "__v": 0
    // }
    setNotes(notes.concat(parseData));
  };

  // Delete Note
  const deleteNote = async (id) => {
    console.log('Deleting note...', id);
    const REQUESTED_URL = `${BASE_URL}/api/notes/deletenote/${id}`;
    const response = await fetch(REQUESTED_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    });

    const parseData = await response.json();
    console.log(parseData);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    const REQUESTED_URL = `${BASE_URL}/api/notes/updatenote/${id}`;
    const response = await fetch(REQUESTED_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const parseData = await response.json();
    console.log(parseData);

    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
