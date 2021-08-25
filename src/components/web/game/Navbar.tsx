import { observer } from 'mobx-react';
import React from 'react';

import './navbar.scss';

interface Props {
  wordCount: number;
  onQuit: () => void;
  onHelp: () => void;
}

@observer
export class Navbar extends React.Component<Props> {
  public render() {
    const { wordCount, onQuit, onHelp } = this.props;

    return (
      <div className={'navbar'}>
        <div className={'quit'}>
          <div className={'button'} onClick={() => onQuit()}>
            quit
          </div>
        </div>
        <div className={'score-container'}>
          <div className={'score'}>{`Words: ${wordCount}`}</div>
        </div>
        <div className={'help'}>
          <div className={'button'} onClick={() => onHelp()}>
            help
          </div>
        </div>
      </div>
    );
  }
}
