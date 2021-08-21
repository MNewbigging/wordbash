import { observer } from 'mobx-react';
import React from 'react';

import './answers-list.scss';

@observer
export class AnswersList extends React.Component {
  public render() {
    return <div className={'answers-list'}></div>;
  }
}
