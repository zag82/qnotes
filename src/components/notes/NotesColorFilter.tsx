import React, { useContext } from 'react';
import NoteContext from '../../context/note/noteContext';
import { Color } from '../../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCircle, faTh } from '@fortawesome/free-solid-svg-icons';

interface Props {}
const NotesColorFilter = (props: Props) => {
  const { colorFilter, colors, filterByColor, auth } = useContext(NoteContext);

  let colorFilterName = colorFilter;
  if (colors) {
    const colorFiltered = colors.filter(
      (cl: Color) => cl.color === colorFilter
    );
    if (colorFiltered !== null && colorFiltered.length > 0)
      colorFilterName = colorFiltered[0].title;
  }

  const filterColors = (color: string) => {
    filterByColor(color);
  };

  if (colors === null || !auth) {
    return null;
  }

  return (
    <li className='nav-item dropdown'>
      <a
        className='nav-link dropdown-toggle'
        href='#!'
        id='navFilter'
        title={
          'Filter by section ' +
          (colorFilter === '' ? '(All)' : `(${colorFilterName})`)
        }
        style={{ color: colorFilter === '' ? '' : colorFilter }}
        role='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        <FontAwesomeIcon icon={faFilter} size='lg' />{' '}
        <span className='d-lg-none'>
          Filter ({colorFilter === '' ? 'All' : colorFilterName})
        </span>
      </a>
      <div className='dropdown-menu' aria-labelledby='navFilter'>
        <a className='dropdown-item' href='#!' onClick={() => filterColors('')}>
          <FontAwesomeIcon icon={faTh} size='lg' /> All sections
        </a>
        <div className='dropdown-divider'></div>
        {colors.map((cl: Color, index: number) => (
          <a
            key={index}
            href='#!'
            onClick={() => filterColors(cl.color)}
            className='dropdown-item'
          >
            <FontAwesomeIcon
              icon={faCircle}
              size='lg'
              style={{ color: cl.color }}
            />{' '}
            {`${cl.title}`}
          </a>
        ))}
      </div>
    </li>
  );
};

export default NotesColorFilter;
