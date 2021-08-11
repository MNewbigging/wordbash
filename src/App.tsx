import { observer } from 'mobx-react';
import React from 'react';

import { HomeScreen } from './components/home/HomeScreen';
import { WordBashScreen, WordBashState } from './state/WordBashState';

import './app-styles.scss';

/**
 * This higher-order component determines whether to render a mobile or web view,
 * depending on the size of the user's screen. It does so on load and on resize,
 * such that the user could resize their desktop window to see a mobile view.
 */
@observer
export class App extends React.PureComponent {
  private readonly wbState = new WordBashState();

  public render() {
    switch (this.wbState.screen) {
      case WordBashScreen.HOME:
        return <HomeScreen />;
      case WordBashScreen.GAME:
        return <div>game scren</div>;
      default:
        return <div>oops</div>;
    }
  }
}
