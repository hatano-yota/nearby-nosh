import { atom } from 'recoil';

export type Location = {
  lat?: number;
  lng?: number;
};

// ローカルストレージから位置情報を取得
const getLocationFromLocalStorage = (): Location | object => {
  const location = localStorage.getItem('userLocation');
  return location ? (JSON.parse(location) as Location) : {};
};

export const locationState = atom<Location>({
  key: 'locationState',
  default: getLocationFromLocalStorage(),
});
