import { observer } from 'mobx-react';
import React from 'react';

import { Letter, LetterStatus } from '../../../utils/LetterGenerator';

import './letter-tile.scss';

interface Props {
  letter: Letter;
  onSelect?: (letter: Letter) => void;
}

export const LetterTile: React.FC<Props> = observer(({ letter, onSelect }) => {
  const selectable = onSelect ? 'selectable' : '';
  const letterClasses = ['letter-tile', letter.status, selectable];

  return (
    <div className={letterClasses.join(' ')} onClick={() => onSelect(letter)}>
      {letter.status !== LetterStatus.INACTIVE && letter.letter}
    </div>
  );
});
