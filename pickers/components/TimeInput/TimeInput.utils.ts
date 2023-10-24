export const addZero = (value: string) => {
  if (value.length === 1 && value !== '0') return `0${value}`;
  return value;
};

export const processInitial = (value: number) => {
  if (value !== 0) return addZero(value.toString());
  return '00';
};
