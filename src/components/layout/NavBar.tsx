import React, { useContext } from 'react';
import NavbarWrapper from './NavbarWrapper';
import NoteContext from '../../context/note/noteContext';
import { appName } from '../../utils/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList,
  faSignOutAlt,
  faPlus,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { PagesContext } from '../../context/pages/pages';
import NotesColorFilter from '../notes/NotesColorFilter';

interface Props {}
const NavBar = (props: Props) => {
  const { setPage } = useContext(PagesContext);
  const { logoutFromApp, searchString, setSearchString } = useContext(
    NoteContext
  );

  // actions
  const doLogout = (e: React.MouseEvent) => {
    logoutFromApp();
  };

  const onAddNote = () => {
    setPage({ id: 'edit', param: null });
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  // notes list
  return (
    <NavbarWrapper>
      <span className='navbar-brand mb-0 h1'>
        <FontAwesomeIcon icon={faClipboardList} size='lg' /> {appName}
      </span>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navMenu'
        aria-controls='navMenu'
        aria-expanded='false'
        aria-label='Toggle navigation menu'
      >
        <FontAwesomeIcon icon={faBars} size='lg' />
      </button>
      <div className='collapse navbar-collapse' id='navMenu'>
        <ul className='navbar-nav mx-auto align-items-lg-center'>
          <li className='menu-separator'></li>
          <NotesColorFilter />
          <li className='nav-item'>
            <input
              className='form-control my-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
              value={searchString}
              onChange={onSearch}
            />
          </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <a
              href='#!'
              className='nav-link'
              onClick={onAddNote}
              title='Add new note'
            >
              <FontAwesomeIcon icon={faPlus} size='lg' />{' '}
              <span className='d-lg-none'>Add new note</span>
            </a>
          </li>
          <li className='nav-item'>
            <a href='#!' className='nav-link' onClick={doLogout} title='Logout'>
              <FontAwesomeIcon icon={faSignOutAlt} size='lg' />{' '}
              <span className='d-lg-none'>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </NavbarWrapper>
  );
};

export default NavBar;
