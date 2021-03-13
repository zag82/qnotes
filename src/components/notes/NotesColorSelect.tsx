import React, { useContext } from 'react';
import NoteContext from '../../context/note/noteContext';
import { Color } from '../../utils/types';

// show the list of colors from global state to make selection
interface Props {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
const NotesColorSelect = ({ color, setColor }: Props) => {
  const { colors } = useContext(NoteContext);

  const onSelectColor = (index: number) => {
    if (colors) {
      const c = colors[index];
      setColor(c.color);
    }
  };

  if (!colors) {
    return <div>Loading colors...</div>;
  }

  return (
    <div className='row mx-0'>
      {colors.map((c: Color, index: number) => (
        <div className='color-category' key={index}>
          <div
            className={
              'color-box' + (c.color === color ? ' selected-color' : '')
            }
          >
            <div
              style={{
                borderRadius: '0.8rem',
                height: '100%',
                backgroundColor: c.color,
                cursor: 'pointer'
              }}
              title={c.title}
              onClick={() => onSelectColor(index)}
            ></div>
          </div>
          <div>{c.title}</div>
        </div>
      ))}
    </div>
  );
};

export default NotesColorSelect;
