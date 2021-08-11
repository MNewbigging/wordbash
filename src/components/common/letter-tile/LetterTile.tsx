import React from 'react';

import './letter-tile.scss';

interface Props {
  letter: string;
}

export const LetterTile: React.FC<Props> = ({ letter }) => {
  return <div className={'letter-tile'}>{letter}</div>;
};
