import * as React from 'react';

export interface ISelectSuffixProps {
  isVisible: boolean,
  setIsVisible: (isVisible: boolean) => void,
  isTime?: boolean,
  showClearButton: boolean,
  onClear: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isDisabled: boolean,
  isEditable: boolean,
}
