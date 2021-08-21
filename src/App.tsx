import { observer } from 'mobx-react';
import React from 'react';

import { ViewMode, WordBashState } from './state/WordBashState';
import { WordBashWeb } from './components/web/WordBashWeb';

import './app.scss';

@observer
export class App extends React.PureComponent {
  private readonly wbState = new WordBashState();

  public render() {
    if (this.wbState.viewMode === ViewMode.DESKTOP) {
      return <WordBashWeb wbState={this.wbState} />;
    }

    return <div></div>;
  }
}
