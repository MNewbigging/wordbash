import { observer } from 'mobx-react';
import React from 'react';

import './button.scss';

interface ButtonProps {
  onPlay: () => void;
  exiting: boolean;
  loading: boolean;
}

@observer
export class Button extends React.PureComponent<ButtonProps> {
  public render() {
    const { onPlay, exiting, loading } = this.props;

    const buttonText = loading ? 'loading' : 'play';
    const exitingClass = exiting ? 'exiting' : '';
    const buttonClass = loading ? 'loading' : 'play';
    const buttonClasses = ['button', exitingClass, buttonClass];

    return (
      <button
        className={buttonClasses.join(' ')}
        onClick={() => {
          if (!loading) {
            onPlay();
          }
        }}
      >
        {buttonText}
      </button>
    );
  }
}
