import { atom } from 'recoil';

export type Range = 1 | 2 | 3 | 4 | 5;

export const rangeState = atom<Range>({
  key: 'rangeState',
  default: 3,
});
