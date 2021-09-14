import { observer } from 'mobx-react';
import React from 'react';

import { Letter } from '../../../model/Letter';
import { GameState } from '../../../state/GameState';
import { HelpDialog } from '../../web/game/HelpDialog';
import { LetterPool } from '../../web/game/LetterPool';
import { Navbar } from '../../web/game/Navbar';

interface Props {
  gameState: GameState;
  onQuit: () => void;
}

@observer
export class GameScreenMobile extends React.PureComponent<Props> {
  render() {
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
            letterPool={gameState.letterPool}
            onSelectLetter={(letter: Letter) => gameState.selectLetter(letter)}
            exitAnim={gameState.gameOver}
          />
        </div>
      </div>
    );
  }
}
