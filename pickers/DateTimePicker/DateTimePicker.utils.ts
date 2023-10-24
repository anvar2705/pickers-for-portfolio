import { WheelEvent } from 'react';

import type { TLocales } from '../../types';

export const renderInputValue = (
  selectedValue: Date | null,
  locales: TLocales,
  isOnlyDatePicker?: boolean,
  isOnlyTimePicker?: boolean,
): string => {
  if (selectedValue) {
    if (!isOnlyDatePicker && !isOnlyTimePicker) {
      return selectedValue.toLocaleTimeString(locales, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
    }
    if (isOnlyDatePicker && !isOnlyTimePicker) {
      return selectedValue.toLocaleDateString(locales, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    if (!isOnlyDatePicker && isOnlyTimePicker) {
      return selectedValue.toLocaleTimeString(locales, {
        hour: 'numeric',
        minute: 'numeric',
      });
    }
  }
  return '';
};

// blur input when wheel
export const blurOnWheel = (event: WheelEvent<HTMLInputElement>) => {
  event.currentTarget.blur();
};
