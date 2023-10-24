import type { TLocales } from '../../../types';

export interface IButtonGroupProps {
  onSelect: () => void,
  onCancel: () => void,
  locales: TLocales,
  isSelectDisabled?: boolean,
}
