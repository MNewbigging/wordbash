import { observer } from 'mobx-react';
import React from 'react';

import { Letter } from '../../../utils/LetterGenerator';

import './letter-tile.scss';

interface Props {
  letter: Letter;
}

export const LetterTile: React.FC<Props> = observer(({ letter }) => {
  return (
    <div className={'letter-tile ' + letter.status}>
      <div className={'content'}>{letter.letter}</div>
    </div>
  );
});
