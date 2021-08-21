import { observer } from 'mobx-react';
import React from 'react';

import { Letter } from '../../../utils/LetterGenerator';
import { LetterTile } from '../../common/letter-tile/LetterTile';

import './letter-pool.scss';

interface Props {
  letterPool: Letter[];
}

@observer
export class LetterPool extends React.Component<Props> {
  public render() {
    const { letterPool } = this.props;

    const animDelayStep = 0.1;
    const maxAnimDelay = letterPool.length * animDelayStep;

    return (
      <div className={'letter-pool'}>
        {letterPool.map((letter, i) => (
          <div
            className={'letter-container'}
            style={{ animationDelay: `${maxAnimDelay - i * animDelayStep}s` }}
          >
            <LetterTile letter={letter} />
          </div>
        ))}
      </div>
    );
  }
}
