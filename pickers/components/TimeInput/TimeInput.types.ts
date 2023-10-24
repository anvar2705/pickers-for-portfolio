import { Dispatch, SetStateAction } from 'react';

export interface ITimeInputProps {
  isVisible: boolean,
  hours: number,
  setHours: Dispatch<SetStateAction<number>>,
  minutes: number,
  setMinutes: Dispatch<SetStateAction<number>>,
}
