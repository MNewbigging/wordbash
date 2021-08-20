import { observer } from 'mobx-react';
import React from 'react';

import { WordBashScreen, WordBashState } from '../../state/WordBashState';
import { HomeScreenWeb } from './home/HomeScreenWeb';

interface Props {
  wbState: WordBashState;
}

@observer
export class WordBashWeb extends React.Component<Props> {
  public render() {
    const { wbState } = this.props;

    if (wbState.screen === WordBashScreen.HOME) {
      return <HomeScreenWeb onPlay={() => wbState.playGame()} />;
    }

    if (wbState.screen === WordBashScreen.GAME) {
      return <div>game</div>;
    }

    return <div></div>;
  }
}
