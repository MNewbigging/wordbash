import { observer } from 'mobx-react';
import React from 'react';
import { LetterStatus } from '../../../model/Letter';

import { LetterTile } from '../../common/letter-tile/LetterTile';

import './home-screen-web.scss';

interface Props {
  onPlay: () => void;
  exiting: boolean;
  loading: boolean;
}

@observer
export class HomeScreenWeb extends React.Component<Props> {
  public render() {
    const { onPlay, exiting, loading } = this.props;

    const exitingClass = exiting ? 'exiting' : '';

    return (
      <div className={'home-screen-web'}>
        <div className={'title'}>
          <div className={'row top ' + exitingClass}>
            <LetterTile letter={{ id: 'w', letter: 'W', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ id: 'o', letter: 'O', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ id: 'r', letter: 'R', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ id: 'd', letter: 'D', status: LetterStatus.NORMAL }} />
          </div>
          <div className={'row bot ' + exitingClass}>
            <LetterTile letter={{ id: 'b', letter: 'B', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ id: 'a', letter: 'A', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ id: 's', letter: 'S', status: LetterStatus.NORMAL }} />
            <LetterTile letter={{ id: 'h', letter: 'H', status: LetterStatus.NORMAL }} />
          </div>
        </div>

        {loading ? (
          <div className={'loading button'}>loading</div>
        ) : (
          <div className={'play button ' + exitingClass} onClick={() => onPlay()}>
            play
          </div>
        )}
      </div>
    );
  }
}
