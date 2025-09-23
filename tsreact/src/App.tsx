import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Note } from "./types";
import { getAllNotes, createNote } from './noteService';



export type NewNote = Omit<Note, "id">;

const App = () => {
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: "testing" }]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get<Note[]>("http://localhost:3001/notes").then((response) => {
      setNotes(response.data as Note[]);
    });
  }, []);

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    axios
      .post<Note>("http://localhost:3001/notes", { content: newNote })
      .then((response) => {
        setNotes(notes.concat(response.data));
      });

    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
