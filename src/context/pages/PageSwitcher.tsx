import React, { useContext, useEffect } from 'react';

import Page from './Page';
import PagesContext from './pagesContext';

// page switcher
interface Props {
  children: React.ReactElement[];
}
const PageSwitcher = (props: Props) => {
  const { page, setPage } = useContext(PagesContext);

  // find pages that fits
  const fitPages = props.children.filter((cmp) => cmp.props.id === page.id);

  useEffect(() => {
    // if no fits - find default pages
    if (fitPages.length === 0) {
      const defaultPages = props.children.filter(
        (cmp) => cmp.type === Page && cmp.props.default === true
      );
      if (defaultPages.length > 0) setPage(defaultPages[0].props.id);
    }
    // eslint-disable-next-line
  }, [fitPages]);

  return <>{fitPages}</>;
};

export default PageSwitcher;
