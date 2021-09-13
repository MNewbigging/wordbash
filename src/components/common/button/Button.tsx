import { observer } from 'mobx-react';
import React from 'react';

import './button.scss';

interface ButtonProps {
  onClick: () => void;
  buttonText: string;
  className?: string;
  exiting?: boolean;
  loading?: boolean;
}

@observer
export class Button extends React.PureComponent<ButtonProps> {
  public render() {
    const { onClick, className, exiting, loading, buttonText } = this.props;

    const btnText = loading ? 'loading' : buttonText;

    const exitingClass = exiting ? 'exiting' : '';
    const loadingClass = loading ? 'loading' : '';
    const buttonClasses = ['button', exitingClass, loadingClass, className];

    return (
      <button
        className={buttonClasses.join(' ')}
        onClick={() => {
          if (!loading) {
            onClick();
          }
        }}
      >
        {btnText}
      </button>
    );
  }
}
