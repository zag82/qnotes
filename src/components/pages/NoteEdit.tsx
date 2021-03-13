import React, { useState, useContext, useEffect } from 'react';
import NotesColorSelect from '../notes/NotesColorSelect';
import NoteContext from '../../context/note/noteContext';
import PagesContext from '../../context/pages/pagesContext';
import NavbarWrapper from '../layout/NavbarWrapper';
import { appName } from '../../utils/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { Note } from '../../utils/types';

// editor
import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-core';
import * as prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism-okaidia.css';

interface Props {}
const NoteEdit = (props: Props) => {
  const { addNote, updateNote, auth } = useContext(NoteContext);
  const { page, setPage } = useContext(PagesContext);

  // initial values
  const initialTitle = page.param ? page.param.title : '';
  const initialBody = page.param ? page.param.body : '';
  const initialColor = page.param ? page.param.color : '#546e7a';

  const [title, setTitle] = useState<string>(initialTitle);
  const [body, setBody] = useState<string>(initialBody);
  const [color, setColor] = useState<string>(initialColor);

  // redirection for auth
  useEffect(() => {
    if (auth === false) {
      setPage('login');
    }
  }, [auth, setPage]);

  // saving changes
  const onSave = () => {
    const newNote: Note = {
      title,
      body,
      color
    };
    if (page.param) {
      newNote._id = page.param._id;
      updateNote(newNote);
      setPage({ id: 'edit', param: newNote });
    } else {
      addNote(newNote);
      setPage({ id: 'edit', param: newNote });
    }
    document.getElementById('btEditSave')?.blur();
  };

  // cancel changes
  const onCancel = () => {
    setBody(initialBody);
    setTitle(initialTitle);
    setColor(initialColor);
    document.getElementById('btEditCancel')?.blur();
  };

  // go back
  const onNavigateBack = () => {
    if (!changed()) setPage('home');
  };

  // check changes
  const changed = (): boolean => {
    return (
      initialBody !== body || initialColor !== color || initialTitle !== title
    );
  };

  return (
    <>
      <NavbarWrapper>
        <a className='navbar-brand' href='#!' onClick={onNavigateBack}>
          <FontAwesomeIcon icon={faArrowLeft} size='lg' />
        </a>
        <div className='navbar-brand mb-0 mr-auto h1'>{appName}</div>
        <div className='ml-5 mr-auto'>
          <button
            className={'btn btn-outline-info' + (!changed() ? ' d-none' : '')}
            onClick={onSave}
            title='Save'
            id='btEditSave'
          >
            <FontAwesomeIcon icon={faCheck} size='lg' />
          </button>
          <button
            className={
              'btn btn-outline-danger ml-2' + (!changed() ? ' d-none' : '')
            }
            onClick={onCancel}
            title='Cancel'
            id='btEditCancel'
          >
            <FontAwesomeIcon icon={faTimes} size='lg' />
          </button>
        </div>
      </NavbarWrapper>
      <div className='container under-navbar'>
        <form id='formNoteEdit'>
          <div className='form-group mt-3'>
            <label htmlFor='inputTitle'>Title:</label>
            <input
              type='text'
              className='form-control'
              id='inputTitle'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter note title'
            />
          </div>
          <div className='form-group'>
            <label>Category:</label>
            <NotesColorSelect color={color} setColor={setColor} />
          </div>
          <div className='form-group line-numbers'>
            <label htmlFor='inputBody'>Body:</label>
            <Editor
              value={body}
              onValueChange={(text) => setBody(text)}
              highlight={(text) =>
                prism.highlight(text, prism.languages.markdown, 'markdown')
              }
              padding={10}
              style={{
                fontFamily: '"Source Code Pro", monospace',
                fontSize: 16
              }}
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default NoteEdit;
