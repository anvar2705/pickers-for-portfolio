import { IBasePickerProps } from '../types';

export interface IDateTimePickerProps extends IBasePickerProps {
  value: Date | null,
  onChange: (newValue: Date | null) => void,
  isOnlyDatePicker?: boolean,
  isOnlyTimePicker?: boolean,
}
