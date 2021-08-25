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

    console.log('dialog status: ', status);

    return (
      <div className={'help-dialog ' + status}>
        <div className={'content'}>Hi I'm help </div>

        <div className={'close button'} onClick={() => onClose()}>
          Got it
        </div>
      </div>
    );
  }
}
