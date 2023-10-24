import { PropsWithChildren } from 'react';

export interface IButtonProps extends PropsWithChildren {
  onClick: () => void,
  variant?: 'primary' | 'secondary',
  disabled?: boolean,
}
