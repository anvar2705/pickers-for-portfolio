import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import { normalizeValue } from 'shared/utils';

import { addZero, processInitial } from './TimeInput.utils';
import { blurOnWheel } from '../../DateTimePicker/DateTimePicker.utils';

import styles from './TimeInput.module.scss';

import type { ITimeInputProps } from './TimeInput.types';

const TimeInput = (props: ITimeInputProps): JSX.Element => {
  const {
    isVisible,
    hours,
    setHours,
    minutes,
    setMinutes,
  } = props;

  const [hoursInput, setHoursInput] = useState<string>(processInitial(hours));
  const [minutesInput, setMinutesInput] = useState<string>(processInitial(minutes));

  const minutesInputRef = useRef<HTMLInputElement>(null);

  // reset values for timePicker when close calendar in edit mode
  useEffect(() => {
    if (!isVisible) {
      if (minutesInput === '') setMinutesInput(addZero(minutes.toString()));
      if (hoursInput === '') setHoursInput(addZero(hours.toString()));
    }
  }, [isVisible, hours, hoursInput, minutes, minutesInput]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>Выбор времени</div>
      <div className={styles.time}>
        <input
          className={classNames(styles.input, styles.primary)}
          type="number"
          value={hoursInput}
          onChange={(event) => {
            const { value } = event.target;
            if (value === '00') {
              setHoursInput(value);
              setHours(Number(value));
              minutesInputRef.current?.focus();
            } else {
              const normalizedValue = normalizeValue(Number(value), 0, 23);
              setHoursInput(addZero(normalizedValue.toString()));
              setHours(normalizedValue);

              if (value.length > 1) minutesInputRef.current?.focus();
            }
          }}
          onFocus={() => {
            setHoursInput('');
          }}
          onBlur={(event) => {
            if (event.target.value === '') {
              setHoursInput(addZero(hours.toString()));
            }
          }}
          onWheel={blurOnWheel}
        />
        :
        <input
          className={classNames(styles.input, styles.secondary)}
          ref={minutesInputRef}
          type="number"
          value={minutesInput}
          onChange={(event) => {
            const { value } = event.target;
            if (value === '00') {
              setMinutesInput(value);
              setMinutes(Number(value));
            } else {
              const normalizedValue = normalizeValue(Number(value), 0, 59);
              setMinutesInput(addZero(normalizedValue.toString()));
              setMinutes(normalizedValue);
            }
          }}
          onFocus={() => {
            setMinutesInput('');
          }}
          onBlur={(event) => {
            if (event.target.value === '') {
              setMinutesInput(addZero(minutes.toString()));
            }
          }}
          onWheel={blurOnWheel}
        />
      </div>
    </div>
  );
};

export default TimeInput;
