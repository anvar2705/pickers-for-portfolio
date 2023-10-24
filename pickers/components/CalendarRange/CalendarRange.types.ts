import { Dispatch, SetStateAction } from 'react';

import type { IRangePickerProps } from '../../RangePicker/RangePicker.types';

export interface ICalendarRangeProps extends Pick<IRangePickerProps, 'firstDayOfWeek' | 'locales' | 'onChange' | 'onChangeMonthYear'> {
  date1: Date | null,
  date2: Date | null,
  setDate1: Dispatch<SetStateAction<Date | null>>,
  setDate2: Dispatch<SetStateAction<Date | null>>,
  setIsVisible: Dispatch<SetStateAction<boolean>>,
}
