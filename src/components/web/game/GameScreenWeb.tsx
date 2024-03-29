import { observer } from 'mobx-react';
import React from 'react';

import { Answer, GameState } from '../../../state/GameState';
import { Letter } from '../../../model/Letter';
import { AnswerInput } from './AnswerInput';
import { LetterPool } from './LetterPool';
import { AnswersList } from './AnswersList';
import { Navbar } from './Navbar';
import { HelpDialog } from './HelpDialog';

import './game-screen-web.scss';

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
        <HelpDialog
          status={gameState.helpDialogStatus}
          onClose={() => gameState.closeHelpDialog()}
        />

        <div className={'score-area'}>
          <Navbar
            wordCount={gameState.acceptedAnswers.length}
            onQuit={onQuit}
            onHelp={() => gameState.openHelpDialog()}
          />
        </div>

        <div className={'letter-pool-area'}>
          <LetterPool
            letterPool={gameState.letterPool}
            onSelectLetter={(letter: Letter) => gameState.selectLetter(letter)}
            exitAnim={gameState.gameOver}
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
