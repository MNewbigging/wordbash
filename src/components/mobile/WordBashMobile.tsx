import { observer } from 'mobx-react';
import React from 'react';

import { WordBashScreen, WordBashState } from '../../state/WordBashState';
import { HomeScreenMobile } from './home/HomeScreenMobile';

interface Props {
  wbState: WordBashState;
}

@observer
export class WordBashMobile extends React.Component<Props> {
  public render() {
    const { wbState } = this.props;

    return (
      <HomeScreenMobile
        onPlay={() => wbState.playGame()}
        exiting={wbState.homeScreenExiting}
        loading={wbState.loading}
      />
    );
  }
}
