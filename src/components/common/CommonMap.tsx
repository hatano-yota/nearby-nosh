import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

import { Location } from '@/hooks/atom/location';

type Props = {
  position: Location;
  className?: string;
};

const CommonMap = (props: Props): JSX.Element => {
  const { position, className } = props;
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY ?? 'apiKey is not defined';

  return (
    <APIProvider apiKey={apiKey}>
      <Map className={className} center={position} zoom={16}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
};

export default CommonMap;
