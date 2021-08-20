import React from 'react';

import './home-screen-web.scss';

export class HomeScreenWeb extends React.Component {
  public render() {
    return (
      <div className={'home-screen-web'}>
        <div className={'title'}></div>
        <div className={'play'}>play</div>
      </div>
    );
  }
}
