import { observer } from 'mobx-react';
import React from 'react';

import { AnswerStatus } from '../../../state/GameState';
import { Letter } from '../../../utils/LetterGenerator';
import { LetterTile } from '../../common/letter-tile/LetterTile';

import './answer-input.scss';

interface Props {
  answerWord: Letter[];
  answerStatus: AnswerStatus;
}

@observer
export class AnswerInput extends React.Component<Props> {
  public render() {
    const { answerWord, answerStatus } = this.props;

    return (
      <div className={'answer-input ' + answerStatus}>
        <div className={'answer-word'}>
          {answerWord.length > 0 &&
            answerWord.map((letter) => (
              <div className={'letter-container'}>
                <LetterTile letter={letter} />
              </div>
            ))}
        </div>

        <div className={'accept-button'}>{'>'}</div>
      </div>
    );
  }
}
