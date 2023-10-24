import { IBasePickerProps } from '../types';

export interface IRangePickerProps extends IBasePickerProps {
  value:TRangeValue,
  onChange: (value: TRangeValue) => void,
}

export type TRangeValue = [Date | null, Date | null];
