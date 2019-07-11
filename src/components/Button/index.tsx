import * as React from 'react';
import './style.scss';

type Props = {
  title: string;
  disabled?: boolean;
  onClick: any;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export class Button extends React.PureComponent<Props> {
  render() {
    const { onClick, title, disabled, className, type } = this.props;
    const classNames = `Button ${className}`;

    return (<button type={type ? type : 'button'} className={classNames} onClick={onClick} disabled={disabled}>{title}</button>)
  }
}
