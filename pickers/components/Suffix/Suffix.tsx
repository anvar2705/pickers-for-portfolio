import * as React from 'react';

import Icons from 'assets/icons';
import { ButtonClear } from 'shared/components';

import { ButtonIcon } from '../../../../ButtonIcon';

import styles from './Suffix.module.scss';

import type { ISelectSuffixProps } from './Suffix.types';

const Suffix = (props: ISelectSuffixProps): JSX.Element => {
  const {
    isVisible,
    setIsVisible,
    isTime,
    showClearButton,
    onClear,
    isDisabled,
    isEditable,
  } = props;

  return (
    <div className={styles.root}>
      {showClearButton && <ButtonClear onClick={onClear} className={styles.clear} />}
      <ButtonIcon
        icon={!isTime ? <Icons.CalendarMonthRound /> : <Icons.ClockOutline />}
        className={isVisible && styles.visible}
        onClick={() => setIsVisible(!isVisible)}
        title="Открыть выбор даты/времени"
        tabIndex={isDisabled || !isEditable ? -1 : undefined}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Suffix;
