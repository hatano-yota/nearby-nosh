/* eslint-disable */
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { mutate } from 'swr';

import ShopCards from '@/components/ShopCards';
import ShopsFilter from '@/components/ShopsFilter';
import Navbar from '@/components/common/Navbar';
import { useShops } from '@/hooks/api/useShops';
import { Geolocation } from '@/lib/Geolocation';

export type Range = 1 | 2 | 3 | 4 | 5;

const Home: NextPage = () => {
  const [lat, setLat] = useState<number>(33.577206);
  const [lng, setLng] = useState<number>(130.257004);
  const [range, setRange] = useState<Range>(3);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const position: GeolocationPosition = await Geolocation.getCurrentPosition();
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setIsLoading(false);
    } catch (positionError) {
      alert(positionError);
    }
  };

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRange(Number(e.target.value) as Range);
    void mutate('/api/shops', undefined, { revalidate: true });
  };

  const { shops, isSWRLoading, isError } = useShops({ lat, lng, range });

  if (isError) return <div>Error fetching data</div>;
  if (isSWRLoading) return <div>Loading...</div>;
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
        <Navbar lat={lat} lng={lng} range={range} handleRangeChange={handleRangeChange} />
        <div className="flex justify-between">
          <div className="mt-8 m-8 w-1/4">
            <ShopsFilter range={range} />
          </div>
          <div className="mt-8 mr-8">
            <ShopCards shops={shops} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
