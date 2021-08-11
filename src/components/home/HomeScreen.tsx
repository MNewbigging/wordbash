import { observer } from 'mobx-react';
import React from 'react';

import './home-screen.scss';

@observer
export class HomeScreen extends React.Component {
  public render() {
    return (
      <div className={'screen home'}>
        <div className={'controls'}>controls</div>
        <div className={'title'}>WORD BASH</div>
        <div className={'play-button'}>play</div>
      </div>
    );
  }
}
