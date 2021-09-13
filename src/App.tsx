import { observer } from 'mobx-react';
import React from 'react';

import { ViewMode, WordBashState } from './state/WordBashState';
import { WordBashWeb } from './components/web/WordBashWeb';
import { WordBashMobile } from './components/mobile/WordBashMobile';

import './app.scss';
import './components/common/styles/common-styles.scss';

@observer
export class App extends React.PureComponent {
  private readonly wbState = new WordBashState();

  public render() {
    let app: JSX.Element;
    switch (this.wbState.viewMode) {
      case ViewMode.DESKTOP:
        app = <WordBashWeb wbState={this.wbState} />;
        break;
      case ViewMode.MOBILE:
        app = <WordBashMobile wbState={this.wbState} />;
        break;
    }

    return <div>{app}</div>;
  }
}
