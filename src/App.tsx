import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import { WordBashMobile } from './components/mobile/WordBashMobile';
import { WordBashWeb } from './components/web/WordBashWeb';

/**
 * This higher-order component determines whether to render a mobile or web view,
 * depending on the size of the user's screen. It does so on load and on resize,
 * such that the user could resize their desktop window to see a mobile view.
 */
@observer
export class App extends React.PureComponent {
  private readonly maxMobileWidth = 768;
  @observable screenWidth = window.innerWidth;

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  public render() {
    console.log('screenWidth', this.screenWidth);

    if (this.screenWidth <= this.maxMobileWidth) {
      return <WordBashMobile />;
    }

    return <WordBashWeb />;
  }

  @action private readonly onResize = () => {
    this.screenWidth = window.innerWidth;
  };
}
