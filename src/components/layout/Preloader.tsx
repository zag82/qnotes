import React from 'react';
import NavbarWrapper from './NavbarWrapper';
import { appName } from '../../utils/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

interface Props {}
const Preloader = (props: Props) => {
  return (
    <section>
      <NavbarWrapper>
        <span className='navbar-brand mb-0 h1'>
          <FontAwesomeIcon icon={faClipboardList} size='lg' /> {appName}
        </span>
      </NavbarWrapper>
      <div className='d-flex flex-column vh-100 justify-content-center'>
        <div className='text-center mb-5'>
          <div className='spinner-grow preloader text-secondary' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preloader;
