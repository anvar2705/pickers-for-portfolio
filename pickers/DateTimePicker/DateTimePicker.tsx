import React, { useEffect, useState } from 'react';

import {
  autoUpdate, flip, hide, offset, useFloating,
} from '@floating-ui/react-dom';
import classNames from 'classnames';

import { useClickOutsideFloatingUI } from 'shared/hooks';

import { renderInputValue } from './DateTimePicker.utils';
import Portal from '../../../Portal/Portal';
import Calendar from '../../Calendar/Calendar';
import Text from '../../Text/Text';
import {
  Suffix,
  TimeInput,
  ButtonGroup,
} from '../components';

import styles from './DateTimePicker.module.scss';

import type { IDateTimePickerProps } from './DateTimePicker.types';

const DateTimePicker = (props: IDateTimePickerProps): JSX.Element => {
  const {
    value,
    onChange,
    isOnlyTimePicker = false,
    isOnlyDatePicker = false,
    locales = 'ru',
    firstDayOfWeek = 'Monday',
    label,
    placeholder,
    isDisabled = false,
    isClearable = true,
    isEditable = true,
    isValid = true,
    onClear,
    markedDays,
    onChangeMonthYear,
    tooltip,
  } = props;

  const {
    x, y, reference, floating, strategy, middlewareData, refs,
  } = useFloating({
    middleware: [offset(4), hide(), flip()],
    strategy: 'fixed',
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
  });

  const [isVisible, setIsVisible] = useClickOutsideFloatingUI(false, refs);

  useEffect(() => {
    if (middlewareData.hide?.referenceHidden) {
      setIsVisible(false);
    }
  }, [middlewareData.hide?.referenceHidden, setIsVisible]);

  const [selectedValue, setSelectedValue] = useState<Date | null>(value);
  const [calendarValue, setCalendarValue] = useState<Date | null>(selectedValue);
  const [hours, setHours] = useState<number>(selectedValue?.getHours() ?? new Date().getHours());
  const [minutes, setMinutes] = useState<number>(
    selectedValue?.getMinutes() ?? new Date().getMinutes(),
  );

  useEffect(() => {
    setSelectedValue(value);
    setCalendarValue(value);
  }, [value]);

  const onSelectDate = () => {
    const newValue = new Date();
    if (calendarValue) {
      newValue.setFullYear(calendarValue.getFullYear());
      newValue.setMonth(calendarValue.getMonth());
      newValue.setDate(calendarValue.getDate());
    }
    newValue.setHours(hours);
    newValue.setMinutes(minutes);

    setSelectedValue(newValue);
    onChange(newValue);
    setIsVisible(false);
  };

  const onCancelChanges = () => {
    setSelectedValue(value);
    setCalendarValue(value);
    setIsVisible(false);
  };

  const onClearHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsVisible(false);

    setSelectedValue(null);
    setCalendarValue(null);
    const today = new Date();
    setHours(today.getHours());
    setMinutes(today.getMinutes());

    onChange(null);

    if (typeof onClear === 'function') {
      onClear();
    }
  };

  const onChangeCalendar = (newValue: Date) => {
    setCalendarValue(newValue);
    if (isOnlyDatePicker) {
      onChange(newValue);
      setIsVisible(false);
    }
  };

  const suffix = (
    <Suffix
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      isTime={isOnlyTimePicker}
      showClearButton={!isDisabled && isEditable && isClearable && Boolean(value)}
      onClear={onClearHandler}
      isDisabled={isDisabled}
      isEditable={isEditable}
    />
  );

  if (isOnlyTimePicker && isOnlyDatePicker) throw new Error('You can\'t use isOnlyTimePicker and isOnlyDatePicker props together!');

  return (
    <div
      ref={reference}
      className={classNames(styles.root, {
        [styles.disabled]: isDisabled,
      })}
    >
      <Text
        readOnly
        value={renderInputValue(
          selectedValue,
          locales,
          isOnlyDatePicker,
          isOnlyTimePicker,
        )}
        onClick={() => setIsVisible(!isVisible)}
        suffix={suffix}
        label={label}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isEditable={isEditable}
        isValid={isValid}
        tooltip={tooltip}
      />
      {isVisible && !isDisabled && (
        <Portal>
          <div
            ref={floating}
            style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
            className={classNames(
              styles.popup,
              !isOnlyDatePicker && styles.pb,
              isOnlyTimePicker && styles.pt,
            )}
          >
            {!isOnlyTimePicker && (
              <Calendar
                value={calendarValue}
                onChange={onChangeCalendar}
                locales={locales}
                firstDayOfWeek={firstDayOfWeek}
                markedDays={markedDays}
                onChangeMonthYear={onChangeMonthYear}
              />
            )}
            {!isOnlyDatePicker && (
              <>
                <TimeInput
                  isVisible={isVisible}
                  hours={hours}
                  setHours={setHours}
                  minutes={minutes}
                  setMinutes={setMinutes}
                />
                <ButtonGroup
                  onSelect={onSelectDate}
                  onCancel={onCancelChanges}
                  locales={locales}
                />
              </>
            )}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default DateTimePicker;
