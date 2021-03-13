import React from 'react';

interface Props {
  children: React.ReactNode;
}
const NavbarWrapper = (props: Props) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
      <div className='container'>{props.children}</div>
    </nav>
  );
};

export default NavbarWrapper;
