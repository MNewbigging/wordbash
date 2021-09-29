import { observer } from 'mobx-react';
import React from 'react';

import { WordBashScreen, WordBashState } from '../../state/WordBashState';
import { GameScreenMobile } from './game/GameScreenMobile';
import { HomeScreenMobile } from './home/HomeScreenMobile';

interface Props {
  wbState: WordBashState;
}

@observer
export class WordBashMobile extends React.Component<Props> {
  public render() {
    const { wbState } = this.props;

    if (wbState.screen === WordBashScreen.GAME && wbState.gameState) {
      return <GameScreenMobile gameState={wbState.gameState} onQuit={() => wbState.quitGame()} />;
    }

    return (
      <HomeScreenMobile
        onPlay={() => wbState.playGame()}
        exiting={wbState.homeScreenExiting}
        loading={wbState.loading}
      />
    );
  }
}
