import { observer } from 'mobx-react';
import React from 'react';

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
            <LetterTile letter={'W'} />
            <LetterTile letter={'O'} />
            <LetterTile letter={'R'} />
            <LetterTile letter={'D'} />
          </div>
          <div className={'row bot ' + exitingClass}>
            <LetterTile letter={'B'} />
            <LetterTile letter={'A'} />
            <LetterTile letter={'S'} />
            <LetterTile letter={'H'} />
          </div>
        </div>
        <div className={'play ' + exitingClass} onClick={() => onPlay()}>
          play
        </div>
      </div>
    );
  }
}
