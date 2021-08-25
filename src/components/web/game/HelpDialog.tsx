import { observer } from 'mobx-react';
import React from 'react';

import { DialogStatus } from '../../../state/GameState';

import './help-dialog.scss';

interface Props {
  status: DialogStatus;
  onClose: () => void;
}

@observer
export class HelpDialog extends React.Component<Props> {
  public render() {
    const { status, onClose } = this.props;

    return (
      <div className={'help-dialog ' + status}>
        <div className={'content'}>
          <div className={'title'}>How to play</div>
          <p>The aim of Word Bash is to use all the letters to make as few words as possible!</p>

          <p>
            You can only use each letter once and give the same answer once. Words you have written
            will appear below the answer input area. You can click on these words to remove them and
            return their letters to be reused.
          </p>
          <p>
            Answers appear with different colours based on how long the word is. Longer answers mean
            fewer words used which means a better score!
          </p>
        </div>

        <div className={'close button'} onClick={() => onClose()}>
          Got it
        </div>
      </div>
    );
  }
}
