/* eslint-disable */
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';

import { useShops } from '@/hooks/api/useShops';
import { Geolocation } from '@/lib/Geolocation';
import { Shop } from '@/lib/Shop';

const Home: NextPage = () => {
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [range, setRange] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentLocation = async () => {
    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition();
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setIsLoading(false);
    } catch (positionError) {
      alert(positionError);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRange(Number(e.target.value));
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
        <select
          defaultValue={3}
          value={range}
          onChange={handleRangeChange}
          className="select w-full max-w-xs"
        >
          <option value={1}>300m</option>
          <option value={2}>500m</option>
          <option value={3} selected>
            1000m
          </option>
          <option value={4}>2000m</option>
          <option value={5}>3000m</option>
        </select>
        <div>
          {shops &&
            shops.map((shop: Shop) => (
              <div key={shop.id}>
                <p>name: {shop.name}</p>
                <p>access: {shop.access}</p>
                <img src={shop.photo.pc.m} alt="店舗のイメージ" />
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
