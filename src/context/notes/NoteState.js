import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      "_id": "6314a3a5aff9e10cdca1b8c6",
      "user": "631468d76bc11f312a96f898",
      "title": "Wake up",
      "description": "Wake up at 07:00am",
      "tag": "personal",
      "date": "2022-09-04T13:09:57.211Z",
      "__v": 0
    },
    {
      "_id": "6315a6688da1bcf7d3d18a4b",
      "user": "631468d76bc11f312a96f898",
      "title": "Shopping",
      "description": "Go to Market",
      "tag": "personal",
      "date": "2022-09-05T07:34:00.507Z",
      "__v": 0
    },
    {
      "_id": "6314a3a5aff9e10cdca1b58c6",
      "user": "631468d76bc11f312a96f898",
      "title": "Wake up",
      "description": "Wake up at 07:00am",
      "tag": "personal",
      "date": "2022-09-04T13:09:57.211Z",
      "__v": 0
    },
    {
      "_id": "6315a6688da14bcf7d3d18a4b",
      "user": "631468d76bc11f312a96f898",
      "title": "Shopping",
      "description": "Go to Market",
      "tag": "personal",
      "date": "2022-09-05T07:34:00.507Z",
      "__v": 0
    },
    {
      "_id": "6314a3a58aff9e10cdca1b8c6",
      "user": "631468d76bc11f312a96f898",
      "title": "Wake up",
      "description": "Wake up at 07:00am",
      "tag": "personal",
      "date": "2022-09-04T13:09:57.211Z",
      "__v": 0
    },
    {
      "_id": "63165a6688da1bcf7d3d18a4b",
      "user": "631468d76bc11f312a96f898",
      "title": "Shopping",
      "description": "Go to Market",
      "tag": "personal",
      "date": "2022-09-05T07:34:00.507Z",
      "__v": 0
    },
    {
      "_id": "6314a3a59aff9e10cdca1b8c6",
      "user": "631468d76bc11f312a96f898",
      "title": "Wake up",
      "description": "Wake up at 07:00am",
      "tag": "personal",
      "date": "2022-09-04T13:09:57.211Z",
      "__v": 0
    },
    {
      "_id": "61315a6688da1bcf7d3d18a4b",
      "user": "631468d76bc11f312a96f898",
      "title": "Shopping",
      "description": "Go to Market",
      "tag": "personal",
      "date": "2022-09-05T07:34:00.507Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(initialNotes);

  // Add Note
  const addNote = (title, description, tag) => {
    console.log("Adding a new note...");
    const note = {
      "_id": "6314a3a5aff4810cdca1b8c6",
      "user": "631468d76bc11f312a96f898",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-09-04T13:09:57.211Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = () => {

  };

  // Edit Note
  const editNote = () => {

  };

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
