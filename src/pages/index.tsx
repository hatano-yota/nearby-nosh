/* eslint-disable */
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import ShopCards from '@/components/ShopCards';
import ShopsFilter from '@/components/ShopsFilter';
import Navbar from '@/components/common/Navbar';
import Pagination from '@/components/common/Pagination';
import { useShops } from '@/hooks/api/useShops';
import { locationState } from '@/hooks/atom/location';
import { rangeState } from '@/hooks/atom/range';
import { startState } from '@/hooks/atom/start';
import { Geolocation } from '@/lib/Geolocation';
import { useRecoilState, useRecoilValue } from 'recoil';

const Home: NextPage = () => {
  const range = useRecoilValue(rangeState);
  const start = useRecoilValue(startState);
  const [location, setLocation] = useRecoilState(locationState);
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

  const { data, isSWRLoading, isError } = useShops({ ...location, range, start });

  if (isError) return <div>Error fetching data</div>;
  if (isSWRLoading) return <div>Loading...</div>;

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
            <ShopsFilter totalCount={data?.totalCount} />
          </div>
          <div className="mt-8 mr-8 w-3/4">
            <ShopCards shops={data?.shops} isLoading={isLoading} />
            <div className="flex w-full justify-center">
              <Pagination totalCount={data?.totalCount} resultsStart={data?.resultsStart} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
