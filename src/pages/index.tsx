/* eslint-disable */
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import ShopCards from '@/components/ShopCards';
import ShopsFilter from '@/components/ShopsFilter';
import Navbar from '@/components/common/Navbar';
import Pagination from '@/components/common/Pagination';
import { useShops } from '@/hooks/api/useShops';
import { Location, locationState } from '@/hooks/atom/location';
import { rangeState } from '@/hooks/atom/range';
import { startState } from '@/hooks/atom/start';
import { Geolocation } from '@/lib/Geolocation';
import { useRecoilState, useRecoilValue } from 'recoil';

const Home: NextPage = () => {
  const range = useRecoilValue(rangeState);
  const start = useRecoilValue(startState);
  const [location, setLocation] = useRecoilState(locationState);

  const getCurrentLocation = async () => {
    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition();

      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (positionError) {
      alert(positionError);
    }
  };

  useEffect(() => {
    const savedLocation = getLocationFromLocalStorage();
    if (savedLocation) setLocation(savedLocation);
    getCurrentLocation();
    saveLocationToLocalStorage(location);
  }, []);

  // 位置情報をローカルストレージに保存
  const saveLocationToLocalStorage = (location: Location) => {
    localStorage?.setItem('userLocation', JSON.stringify(location));
  };

  // ローカルストレージから位置情報を取得
  const getLocationFromLocalStorage = (): Location | null => {
    const location = localStorage?.getItem('userLocation');
    return location ? (JSON.parse(location) as Location) : null;
  };

  const { data, isSWRLoading, isError } = useShops({ ...location, range, start });

  return (
    <>
      <Head>
        <title>近くの飲食店を探す | NEARBY NOSH</title>
        <meta
          name="description"
          content="『NEARBY NOSH』は、現在地からお近くの飲食店を検索するWebサービスです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <div className="flex justify-between">
          <ShopsFilter className="mt-8 m-8 w-1/4" totalCount={data?.totalCount} />
          <div className="mt-8 mr-8 w-3/4">
            <ShopCards shops={data?.shops} isSWRLoading={isSWRLoading} isError={isError} />
            <Pagination totalCount={data?.totalCount} resultsStart={data?.resultsStart} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
