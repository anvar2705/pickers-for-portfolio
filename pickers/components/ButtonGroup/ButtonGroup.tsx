import React from 'react';

import { Button } from './components';

import styles from './ButtonGroup.module.scss';

import type { IButtonGroupProps } from './ButtonGroup.types';

const ButtonGroup = (props: IButtonGroupProps): JSX.Element => {
  const {
    onSelect, onCancel, locales, isSelectDisabled,
  } = props;

  return (
    <div className={styles.root}>
      <Button onClick={onCancel} variant="secondary">
        {locales === 'ru' ? 'Отмена' : 'Cancel'}
      </Button>
      <Button onClick={onSelect} disabled={isSelectDisabled}>
        {locales === 'ru' ? 'Выбрать' : 'Ok'}
      </Button>
    </div>
  );
};

export default ButtonGroup;
