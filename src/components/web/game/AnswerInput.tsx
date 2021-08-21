import { observer } from 'mobx-react';
import React from 'react';

import { Letter } from '../../../utils/LetterGenerator';
import { LetterTile } from '../../common/letter-tile/LetterTile';

import './answer-input.scss';

interface Props {
  answerWord: Letter[];
}

@observer
export class AnswerInput extends React.Component<Props> {
  public render() {
    const { answerWord } = this.props;

    return (
      <div className={'answer-input'}>
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
