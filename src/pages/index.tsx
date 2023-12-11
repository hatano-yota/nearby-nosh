/* eslint-disable */
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import ShopCards from '@/components/ShopCards';
import ShopsFilter from '@/components/ShopsFilter';
import Navbar from '@/components/common/Navbar';
import { locationState } from '@/hooks/atom/location';
import { Geolocation } from '@/lib/Geolocation';
import { useSetRecoilState } from 'recoil';

const Home: NextPage = () => {
  const setLocation = useSetRecoilState(locationState);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const position: GeolocationPosition = await Geolocation.getCurrentPosition();

      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setIsLoading(false);
    } catch (positionError) {
      alert(positionError);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  if (isLoading) return <div>位置情報取得中...</div>;

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
          <div className="mt-8 m-8 w-1/4">
            <ShopsFilter />
          </div>
          <div className="mt-8 mr-8">
            <ShopCards />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
