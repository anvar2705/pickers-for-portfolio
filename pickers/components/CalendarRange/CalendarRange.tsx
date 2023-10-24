/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { ONE_DAY_MS } from '../../../Calendar/Calendar.constants';
import calendarStyles from '../../../Calendar/Calendar.module.scss';
import { getMonthDetails, getDayShortNames } from '../../../Calendar/Calendar.utils';
import dayStyles from '../../../Calendar/components/Day/Day.module.scss';
import MonthYear from '../../../MonthYear/MonthYear';

import type { ICalendarRangeProps } from './CalendarRange.types';
import type { IDayDetails } from '../../../Calendar/Calendar.types';

const CalendarRange = (props: ICalendarRangeProps) => {
  const {
    firstDayOfWeek,
    locales,
    date1,
    date2,
    setDate1,
    setDate2,
    onChangeMonthYear,
  } = props;

  const [year, setYear] = useState<number>(
    date1?.getFullYear() ?? new Date().getFullYear(),
  );
  const [month, setMonth] = useState<number>(date1?.getMonth() ?? new Date().getMonth());
  const [monthDetails, setMonthDetails] = useState<IDayDetails[]>([]);

  const isCurrentDay = (day: IDayDetails) => {
    const todayTimestamp = Date.now() - ((Date.now() - new Date().getTimezoneOffset() * 1000 * 60)
      % ONE_DAY_MS);
    return day.timestamp === todayTimestamp;
  };

  useEffect(() => {
    setMonthDetails(getMonthDetails(year, month, firstDayOfWeek));
  }, [year, month, firstDayOfWeek]);

  const onClickDay = (day: IDayDetails) => () => {
    if (day.month === 0) {
      if (!date1) {
        setDate1(new Date(year, month, day.date));
      } else if (date1 && !date2 && date1.getTime() < day.timestamp) {
        setDate2(new Date(year, month, day.date));
      } else if (date1 && date2) {
        setDate1(new Date(year, month, day.date));
        setDate2(null);
      }
    }
  };

  return (
    <div className={calendarStyles.root}>
      <MonthYear
        month={month}
        year={year}
        onChange={(newValue) => {
          setMonth(newValue.month);
          setYear(newValue.year);
          if (onChangeMonthYear) onChangeMonthYear(newValue);
        }}
        locales={locales}
      />
      <div className={calendarStyles.calendar}>
        <div className={calendarStyles.week}>
          {getDayShortNames(locales, firstDayOfWeek).map((d, i) => (
            <div key={i} className={calendarStyles.day}>
              {d}
            </div>
          ))}
        </div>
        <div className={calendarStyles.days}>{monthDetails.map((day, index) => (
          <button
            key={index}
            type="button"
            className={classNames(dayStyles.default, {
              [dayStyles.disabled]: day.month !== 0
              || ((date1?.getTime() || 0) > day.timestamp && !date2),
              [dayStyles.current]: isCurrentDay(day),
              [dayStyles.selected]: (day.timestamp === date1?.getTime()
              || day.timestamp === date2?.getTime()) && day.month === 0,
              [dayStyles.ranged]: day.month === 0 && date1 && date2
              && day.timestamp >= date1?.getTime()
              && day.timestamp <= date2.getTime(),
              [dayStyles.date1]: day.month === 0 && day.timestamp === date1?.getTime(),
              [dayStyles.date2]: day.month === 0 && day.timestamp === date2?.getTime(),
            })}
            onClick={onClickDay(day)}
          >
            {day.date}
          </button>
        ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarRange;
