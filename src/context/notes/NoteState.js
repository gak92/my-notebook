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

  return (
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
