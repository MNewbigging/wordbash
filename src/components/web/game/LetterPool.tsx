import { observer } from 'mobx-react';
import React from 'react';

import { Letter } from '../../../utils/LetterGenerator';
import { LetterTile } from '../../common/letter-tile/LetterTile';

import './letter-pool.scss';

interface Props {
  letterPool: Letter[];
  onSelectLetter: (letter: Letter) => void;
  exitAnim: boolean;
}

@observer
export class LetterPool extends React.Component<Props> {
  public render() {
    const { letterPool, onSelectLetter, exitAnim } = this.props;

    const animDelayStep = 0.1;
    const maxAnimDelay = letterPool.length * animDelayStep;

    const exitAnimClass = exitAnim ? 'exit' : '';

    return (
      <div className={'letter-pool'}>
        {letterPool.map((letter, i) => (
          <div
            key={'letter-' + letter.id}
            className={'letter-container ' + exitAnimClass}
            style={{ animationDelay: `${maxAnimDelay - i * animDelayStep}s` }}
          >
            <LetterTile letter={letter} onSelect={(letter: Letter) => onSelectLetter(letter)} />
          </div>
        ))}
      </div>
    );
  }
}
