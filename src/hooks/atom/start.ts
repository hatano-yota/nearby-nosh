import { atom } from 'recoil';

export const startState = atom<number>({
  key: 'startState',
  default: 1,
});
