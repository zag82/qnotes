import React, { useContext, useEffect } from 'react';
import NoteContext from '../../context/note/noteContext';
import PagesContext from '../../context/pages/pagesContext';
import Preloader from '../layout/Preloader';
import NoteItem from '../notes/NoteItem';
import NavBar from '../layout/NavBar';
import { Note } from '../../utils/types';

interface Props {}
const NotesList = (props: Props) => {
  const { notes, auth, colorFilter, searchString } = useContext(NoteContext);
  const { setPage } = useContext(PagesContext);

  // redirection for auth
  useEffect(() => {
    // here we compare with false, because it can be null in starting time and
    // application should not redirect pages until setting boolean value
    if (auth === false) {
      setPage('login');
    }
  }, [auth, setPage]);

  // loading progress
  if (notes === null) {
    return <Preloader />;
  }

  // empty notes list
  if (notes.length === 0) {
    return (
      <>
        <NavBar />
        <div className='container'>
          <div className='mt-5 text-center'>There are no notes yet</div>
        </div>
      </>
    );
  }

  // filtering and searching
  let actualNotes = notes;
  // filtered note list
  if (colorFilter !== '') {
    actualNotes = actualNotes.filter((n) => n.color === colorFilter);
  }
  if (searchString !== '') {
    const ss = searchString.toLowerCase();
    actualNotes = actualNotes.filter(
      (n) =>
        n.title.toLowerCase().indexOf(ss) !== -1 ||
        n.body.toLowerCase().indexOf(ss) !== -1
    );
  }

  // show notes
  return (
    <>
      <NavBar />
      <div className='container under-navbar'>
        <div className='row'>
          {actualNotes.map((note: Note, index: number) => (
            <NoteItem note={note} key={note._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotesList;
