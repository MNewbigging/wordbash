import React from 'react';

import { WordBashScreen, WordBashState } from '../../state/WordBashState';
import { HomeScreenWeb } from './home/HomeScreenWeb';

interface Props {
  wbState: WordBashState;
}

export class WordBashWeb extends React.Component<Props> {
  public render() {
    const { wbState } = this.props;

    if (wbState.screen === WordBashScreen.HOME) {
      return <HomeScreenWeb />;
    }

    return <div></div>;
  }
}
