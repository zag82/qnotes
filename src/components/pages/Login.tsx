import React, { useState, useContext, useEffect } from 'react';

import NoteContext from '../../context/note/noteContext';
import PagesContext from '../../context/pages/pagesContext';
import NavbarWrapper from '../layout/NavbarWrapper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { appName } from '../../utils/firebaseConfig';

interface Props {}
const Login = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { loginInApp, auth } = useContext(NoteContext);
  const { setPage } = useContext(PagesContext);

  const doLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const form = document.getElementById('formLogin') as HTMLFormElement;
    form.classList.add('was-validated');

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      loginInApp(email, password);
    }
  };

  // redirection for auth
  useEffect(() => {
    if (auth === true) {
      setPage('home');
    }
  }, [auth, setPage]);

  return (
    <>
      <NavbarWrapper>
        <span className='navbar-brand mb-0 h1'>
          <FontAwesomeIcon icon={faClipboardList} size='lg' /> {appName}
        </span>
      </NavbarWrapper>
      <div className='container under-navbar'>
        <div className='card login-card bg-secondary mt-5 mx-auto'>
          <div className='card-header'>
            <h5>Login</h5>
          </div>
          <form
            className='needs-validation'
            onSubmit={doLogin}
            id='formLogin'
            noValidate
          >
            <div className='card-body'>
              <div className='form-group'>
                <label htmlFor='inputEmail'>Email:</label>
                <input
                  type='email'
                  className='form-control'
                  id='inputEmail'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className='invalid-feedback'>Enter valid user e-mail!</div>
              </div>
              <div className='form-group'>
                <label htmlFor='inputPassword'>Password:</label>
                <input
                  type='password'
                  className='form-control'
                  id='inputPassword'
                  name='pass'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className='invalid-feedback'>Password is required!</div>
              </div>
            </div>
            <div className='card-footer text-right'>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
