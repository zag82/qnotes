import React, { useState, createContext } from 'react';
import { db, auth as fbAuth } from '../../utils/firebaseApp';
import { Note, Color } from '../../utils/types';

// init and types
const defaultAuth = null;
const defaultNotes = null;
const defaultColors = null;
const defaultColorFilter = '';
const defaultSearchString = '';

interface NoteContextProvider {
  notes: Note[] | null;
  colors: Color[] | null;
  colorFilter: string;
  searchString: string;
  auth: boolean | null;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateNote: (note: Note) => void;
  filterByColor: (color: string) => void;
  setSearchString: (str: string) => void;
  loginInApp: (email: string, pass: string) => void;
  logoutFromApp: () => void;
}
const defaultContext: NoteContextProvider = {
  notes: defaultNotes,
  colors: defaultColors,
  colorFilter: defaultColorFilter,
  searchString: defaultSearchString,
  auth: defaultAuth,
  addNote: (note: Note) => {},
  deleteNote: (id: string) => {},
  updateNote: (note: Note) => {},
  filterByColor: (color: string) => {},
  setSearchString: (str: string) => {},
  loginInApp: (email: string, pass: string) => {},
  logoutFromApp: () => {}
};

// context
const NoteContext = createContext<NoteContextProvider>(defaultContext);
export default NoteContext;

interface Props {
  children: React.ReactNode;
}
const NoteProvider = (props: Props) => {
  // state
  const [notes, setNotes] = useState<Note[] | null>(defaultNotes);
  const [colors, setColors] = useState<Color[] | null>(defaultColors);
  const [colorFilter, setColorFilter] = useState<string>(defaultColorFilter);
  const [searchString, setSearchString] = useState<string>(defaultSearchString);
  const [auth, setAuth] = useState<boolean | null>(defaultAuth);

  fbAuth.onAuthStateChanged((user) => {
    const isAuth = user !== null;
    if (isAuth !== auth) {
      setAuth(isAuth);
      afterLoginActions(user);
    }
  });

  // obtain colors and titles
  const getColors = async () => {
    try {
      db.collection('colors')
        .orderBy('order')
        .onSnapshot({ includeMetadataChanges: true }, (doc) => {
          const colors: Color[] = [];
          doc.docs.forEach((itm) => {
            const c = { ...itm.data(), _id: itm.id };
            colors.push(c as Color);
          });

          setColors(colors);
        });
    } catch (err) {
      setAuth(false);
      console.log(err.toString());
    }
  };

  // Get Notes
  const getNotes = async () => {
    try {
      db.collection('notes')
        .orderBy('updated_at', 'desc')
        .onSnapshot({ includeMetadataChanges: true }, (doc) => {
          const notes: Note[] = [];
          doc.docs.forEach((itm) => {
            const n = {
              ...itm.data(),
              _id: itm.id,
              updated_at: itm.data().updated_at.toDate()
            };
            notes.push(n as Note);
          });
          setNotes(notes);
        });
    } catch (err) {
      setAuth(false);
      console.log(err.toString());
    }
  };

  // Add Note
  const addNote = async (note: Note) => {
    try {
      const newNote = { ...note, updated_at: new Date() };
      await db.collection('notes').add(newNote);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete note
  const deleteNote = async (id: string) => {
    try {
      await db.collection('notes').doc(id).delete();
    } catch (err) {
      console.log(err.response.msg);
    }
  };

  // Update note
  const updateNote = async (note: Note) => {
    try {
      let newNote = { ...note, updated_at: new Date() };
      delete newNote['_id'];
      await db.collection('notes').doc(note._id).set(newNote);
    } catch (err) {
      console.log(err.response.msg);
    }
  };

  // activate color filter
  const filterByColor = (color: string) => {
    setColorFilter(color);
  };

  // login and logout from app
  const afterLoginActions = (user: firebase.User | null) => {
    if (user) {
      getColors();
      getNotes();
    }
  };
  const loginInApp = async (email: string, pass: string) => {
    try {
      await fbAuth.signInWithEmailAndPassword(email, pass);

      // obtain data from firestore
      afterLoginActions(fbAuth.currentUser);
    } catch (err) {
      setAuth(false);
      console.log(err.message);
    }
  };

  const logoutFromApp = () => {
    fbAuth.signOut();
    setAuth(false);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        colors,
        colorFilter,
        searchString,
        auth,
        addNote,
        deleteNote,
        updateNote,
        filterByColor,
        setSearchString,
        loginInApp,
        logoutFromApp
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export { NoteProvider };
