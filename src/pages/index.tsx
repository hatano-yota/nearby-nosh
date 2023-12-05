/* eslint-disable */
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useShops } from '@/hooks/api/useShops';
import { Geolocation } from '@/lib/Geolocation';
import { Shop } from '@/lib/Shop';

const Home: NextPage = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [range, setRange] = useState(4);

  const getCurrentLocation = async () => {
    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition();
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    } catch (positionError) {
      alert(positionError);
    }
  };

  useEffect(() => {
    void getCurrentLocation();
  }, []);

  const { shops, isLoading, isError } = useShops(lat, lng, range);

  if (isError) return <div>Error fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

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
        <button onClick={getCurrentLocation}>現在地を取得する</button>
        <div>
          <div>
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
          </div>
        </div>

        <button>近くの飲食店を検索する</button>
        <div>
          {shops &&
            shops.map((shop: Shop) => (
              <div key={shop.id}>
                <p>name: {shop.name}</p>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
