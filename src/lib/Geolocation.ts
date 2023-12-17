/**
 * 位置情報クラス
 */
export class Geolocation {
  static getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise<GeolocationPosition>(
      (
        resolve: (position: GeolocationPosition) => void,
        reject: (positionError: GeolocationPositionError) => void,
      ) => {
        if (!navigator.geolocation) {
          const error: GeolocationPositionError = {
            code: 0,
            message: 'geolocation not supported.',
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          };
          reject(error);
        }

        const successCallback: PositionCallback = (position: GeolocationPosition): void => {
          resolve(position);
        };

        const errorCallback: PositionErrorCallback = (
          positionError: GeolocationPositionError,
        ): void => {
          reject(positionError);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
          enableHighAccuracy: false,
        });
      },
    );
  }
}

export type Location = {
  lat?: number;
  lng?: number;
};
