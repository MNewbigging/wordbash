import { observer } from 'mobx-react';
import React from 'react';

import { GameState } from '../../../state/GameState';

import './game-screen-web.scss';

interface Props {
  gameState: GameState;
}

@observer
export class GameScreenWeb extends React.Component<Props> {
  public render() {
    return <div className={'game-screen-web'}>game</div>;
  }
}
