import { observer } from 'mobx-react';
import React from 'react';

import { AnswerStatus } from '../../../state/GameState';
import { Letter } from '../../../utils/LetterGenerator';
import { LetterTile } from '../../common/letter-tile/LetterTile';

import './answer-input.scss';

interface Props {
  answerWord: Letter[];
  answerStatus: AnswerStatus;
  onAccept: () => void;
  onRemoveLetter: (letter: Letter) => void;
}

@observer
export class AnswerInput extends React.Component<Props> {
  public render() {
    const { answerWord, answerStatus, onAccept, onRemoveLetter } = this.props;

    return (
      <div className={'answer-input ' + answerStatus}>
        <div className={'answer-word'}>
          {answerWord.length > 0 &&
            answerWord.map((letter) => (
              <div key={'answer-' + letter.id} className={'letter-container'}>
                <LetterTile letter={letter} onSelect={(letter: Letter) => onRemoveLetter(letter)} />
              </div>
            ))}
        </div>

        <div className={'accept-button'} onClick={() => onAccept()}>
          {'>'}
        </div>
      </div>
    );
  }
}
