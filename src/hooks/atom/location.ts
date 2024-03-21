import { atom } from 'recoil';

export type Location = {
  lat: number;
  lng: number;
};

export const locationState = atom<Location>({
  key: 'locationState',
  default: {
    lat: 0,
    lng: 0,
  },
});
