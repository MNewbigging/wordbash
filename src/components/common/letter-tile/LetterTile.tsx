import { observer } from 'mobx-react';
import React from 'react';

import { Letter } from '../../../utils/LetterGenerator';

import './letter-tile.scss';

interface Props {
  letter: Letter;
  onSelect?: (letter: Letter) => void;
}

export const LetterTile: React.FC<Props> = observer(({ letter, onSelect }) => {
  return (
    <div className={'letter-tile ' + letter.status} onClick={() => onSelect(letter)}>
      <div className={'content'}>{letter.letter}</div>
    </div>
  );
});
