import * as React from 'react';
import './style.scss';

type Props = {
  title?: string;
  onClick: any;
  className?: string;
  isPrimary?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export class Button extends React.PureComponent<Props> {
  render() {
    const { onClick, title, isDisabled, className, type, isPrimary } = this.props;
    let classNames = `Button ${className}`;

    if (isPrimary) {
      classNames = classNames + ' Button--primary';
    }

    return (
    <button type={type ? type : 'button'}  className={classNames} onClick={onClick} disabled={isDisabled}>
      {title && <span>{title}</span>}
      {this.props.children}
    </button>
    )
  }
}
