import { observer } from 'mobx-react';
import React from 'react';

import { WordBashScreen, WordBashState } from '../../state/WordBashState';
import { GameScreenWeb } from './game/GameScreenWeb';
import { HomeScreenWeb } from './home/HomeScreenWeb';

interface Props {
  wbState: WordBashState;
}

@observer
export class WordBashWeb extends React.Component<Props> {
  public render() {
    const { wbState } = this.props;

    if (wbState.screen === WordBashScreen.HOME) {
      return (
        <HomeScreenWeb
          onPlay={() => wbState.playGame()}
          exiting={wbState.homeScreenExiting}
          loading={wbState.loading}
        />
      );
    }

    if (wbState.screen === WordBashScreen.GAME && wbState.gameState) {
      return <GameScreenWeb gameState={wbState.gameState} onQuit={() => wbState.quitGame()} />;
    }

    return <div></div>;
  }
}
