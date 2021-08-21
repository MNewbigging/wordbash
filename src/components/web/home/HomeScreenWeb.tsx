import { observer } from 'mobx-react';
import React from 'react';
import { LetterStatus } from '../../../utils/LetterGenerator';

import { LetterTile } from '../../common/letter-tile/LetterTile';

import './home-screen-web.scss';

interface Props {
  onPlay: () => void;
  exiting: boolean;
}

@observer
export class HomeScreenWeb extends React.Component<Props> {
  public render() {
    const { onPlay, exiting } = this.props;

    const exitingClass = exiting ? 'exiting' : '';

    return (
      <div className={'home-screen-web'}>
        <div className={'title'}>
          <div className={'row top ' + exitingClass}>
            <LetterTile letter={{ letter: 'W', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ letter: 'O', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ letter: 'R', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ letter: 'D', status: LetterStatus.NORMAL }} />
          </div>
          <div className={'row bot ' + exitingClass}>
            <LetterTile letter={{ letter: 'B', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ letter: 'A', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ letter: 'S', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ letter: 'H', status: LetterStatus.NORMAL }} />
          </div>
        </div>
        <div className={'play ' + exitingClass} onClick={() => onPlay()}>
          play
        </div>
      </div>
    );
  }
}
