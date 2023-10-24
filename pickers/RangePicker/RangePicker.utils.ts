import type { TRangeValue } from './RangePicker.types';
import type { TLocales } from '../../types';

export const renderInputValue = (range: TRangeValue, locales: TLocales)
: string => (range[0] && range[1]
  ? `${range[0].toLocaleDateString(locales, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })} - ${range[1].toLocaleDateString(locales, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })}` : '');
