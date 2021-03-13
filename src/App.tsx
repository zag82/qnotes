import React from 'react';
import { Page, PageSwitcher, PagesProvider } from './context/pages/pages';

// components
import { NoteProvider } from './context/note/noteContext';
import { DialogYesNoProvider } from './context/dialogYesNo/dialogYesNoContext';
// pages
import Login from './components/pages/Login';
import NotesList from './components/pages/NotesList';
import NoteEdit from './components/pages/NoteEdit';

function App() {
  return (
    <NoteProvider>
      <DialogYesNoProvider>
        <PagesProvider>
          <PageSwitcher>
            <Page id='home' component={<NotesList />} default={true} />
            <Page id='login' component={<Login />} />
            <Page id='edit' component={<NoteEdit />} />
          </PageSwitcher>
        </PagesProvider>
      </DialogYesNoProvider>
    </NoteProvider>
  );
}

export default App;
