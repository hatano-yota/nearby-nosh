/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useShopsGet } from '@/hooks/api/useShopsGet';
import { keywordState } from '@/hooks/atom/keyword';
import { Location, locationState } from '@/hooks/atom/location';
import { rangeState } from '@/hooks/atom/range';
import { startState } from '@/hooks/atom/start';
import { Geolocation } from '@/lib/Geolocation';
import { Shop } from '@/lib/Shop';

type UseShopsReturn = {
  location: Location;
  shops: Shop[];
  totalCount: number;
  resultsStart: number;
  isSWRLoading: boolean;
  error: unknown;
};

export const useShops = (): UseShopsReturn => {
  const range = useRecoilValue(rangeState);
  const start = useRecoilValue(startState);
  const keyword = useRecoilValue(keywordState);
  const [location, setLocation] = useRecoilState(locationState);

  const getCurrentLocation = async () => {
    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition();

      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      saveLocationToLocalStorage(location);
    } catch (positionError) {
      alert(positionError);
    }
  };

  // 位置情報をローカルストレージに保存
  const saveLocationToLocalStorage = (location: Location) => {
    localStorage?.setItem('userLocation', JSON.stringify(location));
  };

  // ローカルストレージから位置情報を取得
  const getLocationFromLocalStorage = (): Location | null => {
    const location = localStorage?.getItem('userLocation');
    return location ? (JSON.parse(location) as Location) : null;
  };

  useEffect(() => {
    const savedLocation = getLocationFromLocalStorage();
    if (savedLocation) setLocation(savedLocation);
    void getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isSWRLoading, error } = useShopsGet({ ...location, range, start, keyword });

  return {
    location,
    shops: data?.shops,
    totalCount: data?.totalCount,
    resultsStart: data?.resultsStart,
    isSWRLoading,
    error,
  };
};
