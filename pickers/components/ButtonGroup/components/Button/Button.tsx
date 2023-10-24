import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

import type { IButtonProps } from './Button.types';

const Button = (props: IButtonProps): JSX.Element => {
  const {
    variant = 'primary', onClick, disabled, children,
  } = props;

  return (
    <button
      type="button"
      className={classNames(styles.root, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
