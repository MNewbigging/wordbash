import { observer } from 'mobx-react';
import React from 'react';
import { Answer } from '../../../state/GameState';

import './answers-list.scss';

interface Props {
  answers: Answer[];
  onRemove: (answer: Answer) => void;
}

@observer
export class AnswersList extends React.Component<Props> {
  public render() {
    const { answers } = this.props;

    return <div className={'answers-list'}>{answers.map((ans) => this.renderAnswer(ans))}</div>;
  }

  private renderAnswer(answer: Answer) {
    const { onRemove } = this.props;

    return (
      <div key={answer.word} className={'answer ' + answer.level} onClick={() => onRemove(answer)}>
        <div>{answer.word}</div>
      </div>
    );
  }
}
