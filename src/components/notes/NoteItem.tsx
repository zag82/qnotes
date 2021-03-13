import React, { useContext } from 'react';
import NoteContext from '../../context/note/noteContext';
import DialogYesNoContext from '../../context/dialogYesNo/dialogYesNoContext';
import PagesContext from '../../context/pages/pagesContext';
import { Note } from '../../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

// syntax highlight
import 'prismjs/components/prism-core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism-okaidia.css';

interface Props {
  note: Note;
}
const NoteItem = ({ note }: Props) => {
  const { title, body, color, updated_at, _id } = note;

  const bodyLines = body.split('\n');
  const bodyText = bodyLines.length === 0 ? ' ' : bodyLines[0];

  const { deleteNote } = useContext(NoteContext);
  const { confirmDialog } = useContext(DialogYesNoContext);
  const { setPage } = useContext(PagesContext);

  let deleteClicked = false;

  const onDelete = (e: React.MouseEvent) => {
    deleteClicked = true;
    e.preventDefault();
    confirmDialog('Are you sure you want to delete this note?', () => {
      deleteNote(_id as string);
    });
  };

  const onEditNote = (e: React.MouseEvent) => {
    if (!deleteClicked) {
      e.preventDefault();
      setPage({ id: 'edit', param: note });
    }
    deleteClicked = false;
  };

  function increaseFormat(value: number) {
    return value < 10 ? String('0') + value : String(value);
  }
  function formatDate(dt: Date) {
    const today = new Date();
    const d = new Date(dt);
    if (
      today.getFullYear() === d.getFullYear() &&
      today.getMonth() === d.getMonth() &&
      today.getDate() === d.getDate()
    ) {
      // same day
      const hour = increaseFormat(d.getHours());
      const minute = increaseFormat(d.getMinutes());
      return `${hour}:${minute}`;
    }
    const year = d.getFullYear();
    const month = increaseFormat(d.getMonth() + 1);
    const day = increaseFormat(d.getDate());
    return `${day}.${month}.${year}`;
  }

  return (
    <div className='col-xl-4 col-md-6 mt-3'>
      <div className='card note-item' onClick={onEditNote}>
        <div
          className='card-header note-item-header'
          style={{ backgroundColor: color }}
        >
          <span>{title}</span>
          <a href='#!' onClick={onDelete} title='Delete'>
            <FontAwesomeIcon icon={faTrashAlt} size='sm' />
          </a>
        </div>
        {/* <div className='row no-gutters'> */}
        {/* <div className='col-1' style={{ backgroundColor: color }}></div> */}
        {/* <div className='col-11'> */}
        <div className='card-body'>
          <pre
            className='note-item-preview'
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(
                bodyText,
                Prism.languages.markdown,
                'markdown'
              )
            }}
          ></pre>
          <div className='text-right note-item-footer'>
            Last edited: {formatDate(updated_at as Date)}
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default NoteItem;
