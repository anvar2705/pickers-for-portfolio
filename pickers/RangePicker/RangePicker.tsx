import React, { useEffect, useState } from 'react';

import {
  autoUpdate, flip, hide, offset, useFloating,
} from '@floating-ui/react-dom';
import classNames from 'classnames';

import { useClickOutsideFloatingUI } from 'shared/hooks';

import { renderInputValue } from './RangePicker.utils';
import Portal from '../../../Portal/Portal';
import Text from '../../Text/Text';
import {
  ButtonGroup,
  CalendarRange,
  Suffix,
} from '../components';
import styles from '../DateTimePicker/DateTimePicker.module.scss';

import type { IRangePickerProps } from './RangePicker.types';

const RangePicker = (props: IRangePickerProps): JSX.Element => {
  const {
    value,
    onChange,
    locales = 'ru',
    firstDayOfWeek = 'Monday',
    label,
    placeholder,
    onClear,
    isEditable = true,
    isClearable = true,
    isDisabled = false,
    isValid = true,
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

  const [date1, setDate1] = useState<Date | null>(value[0]);
  const [date2, setDate2] = useState<Date | null>(value[1]);

  const onSelect = () => {
    onChange([date1, date2]);
    setIsVisible(false);
  };

  const onCancel = () => {
    setDate1(value[0]);
    setDate2(value[1]);
    setIsVisible(false);
  };

  useEffect(() => {
    setDate1(value[0]);
    setDate2(value[1]);
  }, [value]);

  const onClearHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsVisible(false);

    setDate1(null);
    setDate2(null);

    onChange([null, null]);

    if (typeof onClear === 'function') {
      onClear();
    }
  };

  const suffix = (
    <Suffix
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      showClearButton={!isDisabled
        && isEditable
        && isClearable
        && Boolean(value[0]) && Boolean(value[1])}
      onClear={onClearHandler}
      isDisabled={isDisabled}
      isEditable={isEditable}
    />
  );

  return (
    <div
      ref={reference}
      className={classNames(styles.root, {
        [styles.disabled]: isDisabled,
      })}
    >
      <Text
        readOnly
        value={renderInputValue(value, locales)}
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
            className={classNames(styles.popup, styles.pb)}
          >
            <CalendarRange
              {...{
                firstDayOfWeek,
                locales,
                onChange,
                date1,
                date2,
                setDate1,
                setDate2,
                setIsVisible,
                onChangeMonthYear,
              }}
            />
            <ButtonGroup
              onSelect={onSelect}
              onCancel={onCancel}
              locales={locales}
              isSelectDisabled={!date1 || !date2}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default RangePicker;
