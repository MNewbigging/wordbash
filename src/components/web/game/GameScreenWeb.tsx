import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from '../../../state/GameState';
import { Letter } from '../../../utils/LetterGenerator';
import { AnswerInput } from './AnswerInput';
import { LetterPool } from './LetterPool';

import './game-screen-web.scss';

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
          <LetterPool
            letterPool={gameState.letterPool}
            onSelectLetter={(letter: Letter) => gameState.addAnswerLetter(letter.letter)}
          />
        </div>
        <div className={'answer-input-area'}>
          <AnswerInput
            answerWord={gameState.answerWord}
            answerStatus={gameState.answerStatus}
            onAccept={() => gameState.validateAnswerWord()}
            onRemoveLetter={(letter: Letter) => gameState.removeAnswerLetter(letter)}
          />
        </div>
        <div className={'answer-area'}>
          <div className={'game-info'}>SCORE ~ BUTTONS</div>
          <div className={'answer-list'}>YOUR ANSWERS HERE</div>
        </div>
      </div>
    );
  }
}
