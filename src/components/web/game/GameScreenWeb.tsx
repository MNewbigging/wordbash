import { observer } from 'mobx-react';
import React from 'react';

import { Answer, GameState } from '../../../state/GameState';
import { Letter } from '../../../utils/LetterGenerator';
import { AnswerInput } from './AnswerInput';
import { LetterPool } from './LetterPool';
import { AnswersList } from './AnswersList';

import './game-screen-web.scss';
import { Navbar } from './Navbar';

interface Props {
  gameState: GameState;
  onQuit: () => void;
}

@observer
export class GameScreenWeb extends React.Component<Props> {
  public render() {
    const { gameState, onQuit } = this.props;

    return (
      <div className={'game-screen-web'}>
        <div className={'score-area'}>
          <Navbar wordCount={gameState.acceptedAnswers.length} onQuit={onQuit} />
        </div>

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

        <div className={'answers-area'}>
          <AnswersList
            answers={gameState.acceptedAnswers}
            onRemove={(answer: Answer) => gameState.removeAnswer(answer)}
          />
        </div>
      </div>
    );
  }
}
