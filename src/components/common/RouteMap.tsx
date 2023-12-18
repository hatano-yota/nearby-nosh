import { Map, useDirectionsService, useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';

import { Location } from '@/hooks/atom/location';

type Props = {
  currentLocation: Location;
  shopLocation: Location;
};

const RouteMap = (props: Props): JSX.Element => {
  const map = useMap();
  const { directionsService, directionsRenderer } = useDirectionsService({ renderOnMap: true });
  const { currentLocation, shopLocation } = props;

  useEffect(() => {
    if (!map) return;
    void directionsService?.route(
      {
        origin: currentLocation,
        destination: shopLocation,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer?.setOptions({
            directions: result,
            suppressMarkers: true,
          });

          new google.maps.Marker({
            position: result?.routes[0].legs[0].start_location,
            map: map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeWeight: 3,
              strokeColor: 'white',
            },
          });

          new google.maps.Marker({
            position: result?.routes[0].legs[0].end_location,
            map: map,
          });
        } else {
          alert(status);
        }
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return <Map center={shopLocation} zoom={16}></Map>;
};

export default RouteMap;
