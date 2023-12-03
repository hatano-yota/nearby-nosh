import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

import { Geolocation } from '@/lib/Geolocation';

const Home: NextPage = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);

  const getCurrentLocation = async () => {
    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition();
      setLocation(position.coords);
    } catch (positionError) {
      alert(positionError);
    }
  };

  return (
    <>
      <Head>
        <title>近くのお店を探す</title>
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
          <h1>Geolocation Example</h1>
          {location && (
            <div>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
              <p>Accuracy: {location.accuracy} meters</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
