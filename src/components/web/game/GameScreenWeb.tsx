import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from '../../../state/GameState';
import { LetterTile } from '../../common/letter-tile/LetterTile';
import { AnswerInput } from './AnswerInput';

import './game-screen-web.scss';
import { LetterPool } from './LetterPool';

interface Props {
  gameState: GameState;
}

@observer
export class GameScreenWeb extends React.Component<Props> {
  public render() {
    const { gameState } = this.props;

    return (
      <div className={'game-screen-web'}>
        <div className={'letter-pool-area'}>
          <LetterPool letterPool={gameState.letterPool} />
        </div>
        <div className={'answer-input-area'}>
          <AnswerInput answerWord={gameState.answerWord} answerStatus={gameState.answerStatus} />
        </div>
        <div className={'answer-area'}>
          <div className={'game-info'}>SCORE ~ BUTTONS</div>
          <div className={'answer-list'}>YOUR ANSWERS HERE</div>
        </div>
      </div>
    );
  }
}
