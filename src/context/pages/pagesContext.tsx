import React, { createContext, useState } from 'react';
import { Note } from '../../utils/types';

// init and types
interface PagesState {
  id: string;
  param: null | Note;
}
interface PagesContextProvider {
  page: PagesState;
  setPage: Function;
}
const initialState: PagesState = { id: '', param: null };
const defaultContext: PagesContextProvider = {
  page: initialState,
  setPage: (_: string | PagesState) => {}
};

// context
const PagesContext = createContext<PagesContextProvider>(defaultContext);
export default PagesContext;

// context provider
interface Props {
  children: React.ReactNode;
}
const PagesProvider = (props: Props) => {
  // state for single current page
  const [page, updatePage] = useState<PagesState>(initialState);

  const setPage = (pageData: string | PagesState) => {
    //console.log('Set page', pageData);
    const newPage =
      typeof pageData === 'string' ? { id: pageData, param: null } : pageData;

    updatePage(newPage);
  };

  return (
    <PagesContext.Provider
      value={{
        page,
        setPage
      }}
    >
      {props.children}
    </PagesContext.Provider>
  );
};
export { PagesProvider };
