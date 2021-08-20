import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from '../../../state/GameState';

import './game-screen-web.scss';

interface Props {
  gameState: GameState;
}

@observer
export class GameScreenWeb extends React.Component<Props> {
  public render() {
    return (
      <div className={'game-screen-web'}>
        <div className={'letter-pool'}>LETTER GRID</div>
        <div className={'answer-input'}>
          <div className={'input-area'}>ANSWER INPUT</div>
        </div>
        <div className={'answer-area'}>
          <div className={'game-info'}>SCORE ~ BUTTONS</div>
          <div className={'answer-list'}>YOUR ANSWERS HERE</div>
        </div>
      </div>
    );
  }
}
