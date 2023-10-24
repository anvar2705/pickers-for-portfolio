import { IMonthYearValue } from '../MonthYear/MonthYear.types';

import type { ITextProps } from '../Text/Text.types';
import type { TFirstDayOfWeek, TLocales } from '../types';

export interface IBasePickerProps extends Pick<ITextProps, 'isDisabled' | 'label' | 'placeholder' | 'isEditable' | 'isValid' | 'isClearable' | 'tooltip'> {
  locales?: TLocales,
  firstDayOfWeek?: TFirstDayOfWeek,
  onClear?: () => void,
  markedDays?: string[],
  onChangeMonthYear?: (value: IMonthYearValue) => void,
}
