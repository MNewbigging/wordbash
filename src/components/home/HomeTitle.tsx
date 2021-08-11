import React from 'react';
import { LetterTile } from '../common/letter-tile/LetterTile';

import './home-title.scss';

export const HomeTitle: React.FC = () => {
  return (
    <div className={'home-title'}>
      <div className={'row'}>
        <div>W</div>
        <div>O</div>
        <div>R</div>
        <div>D</div>
      </div>
      <div className={'row'}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
