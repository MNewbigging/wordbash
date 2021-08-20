import React from 'react';
import { LetterTile } from '../../common/letter-tile/LetterTile';

import './home-screen-web.scss';

interface Props {
  onPlay: () => void;
}

export class HomeScreenWeb extends React.Component<Props> {
  public render() {
    const { onPlay } = this.props;

    return (
      <div className={'home-screen-web'}>
        <div className={'title'}>
          <div className={'row top'}>
            <LetterTile letter={'W'} />
            <LetterTile letter={'O'} />
            <LetterTile letter={'R'} />
            <LetterTile letter={'D'} />
          </div>
          <div className={'row bot'}>
            <LetterTile letter={'B'} />
            <LetterTile letter={'A'} />
            <LetterTile letter={'S'} />
            <LetterTile letter={'H'} />
          </div>
        </div>
        <div className={'play'} onClick={() => onPlay()}>
          play
        </div>
      </div>
    );
  }
}
