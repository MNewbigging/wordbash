import { observer } from 'mobx-react';
import React from 'react';

import { Letter } from '../../../model/Letter';
import { Answer, GameState } from '../../../state/GameState';
import { AnswerInput } from '../../web/game/AnswerInput';
import { AnswersList } from '../../web/game/AnswersList';
import { HelpDialog } from '../../web/game/HelpDialog';
import { LetterPool } from '../../web/game/LetterPool';
import { Navbar } from '../../web/game/Navbar';

import './game-screen-mobile.scss';
import './navbar-mobile.scss';

interface Props {
  gameState: GameState;
  onQuit: () => void;
}

@observer
export class GameScreenMobile extends React.PureComponent<Props> {
  public render() {
    const { gameState, onQuit } = this.props;

    return (
      <div className={'game-screen-mobile'}>
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
            className={'letter-pool-mob'}
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
