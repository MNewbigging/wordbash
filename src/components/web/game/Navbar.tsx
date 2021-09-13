import { observer } from 'mobx-react';
import React from 'react';

import { Button } from '../../common/button/Button';

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
          <Button onClick={onQuit} buttonText={'quit'} />
        </div>
        <div className={'score-container'}>
          <div className={'score'}>{`Words: ${wordCount}`}</div>
        </div>
        <div className={'help'}>
          <Button onClick={onHelp} buttonText={'help'} />
        </div>
      </div>
    );
  }
}
