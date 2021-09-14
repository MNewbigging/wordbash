import { observer } from 'mobx-react';
import { ObservableObjectAdministration } from 'mobx/lib/internal';
import React from 'react';

import { GameState } from '../../../state/GameState';

interface Props {
  gameState: GameState;
  onQuit: () => void;
}

@observer
export class GameScreenMobile extends React.PureComponent<Props> {
  public render() {
    const { gameState, onQuit } = this.props;

    return <div className={'game-screen-mobile'}>Game Screen</div>;
  }
}
