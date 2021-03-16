import { Injectable } from '@angular/core';
import { AgmMap, MouseEvent, MapsAPILoader } from '@agm/core';

export interface Location {
  latitude: number;
  longitude: number;
  mapType?: string;
  zoom?: number;
  markers?: Array<Marker>;
}

interface Marker {
  lat: number;
  lng: number;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  /**
   *
   *  */
  getLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 18,
            markers: [
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                label: 'Mi posición actual',
              },
            ],
          });
        },
        (error) => {
          alert(
            'La geolocalización no está activada o no es soportada por éste navegador, por favor intente con otro.'
          );
          reject(error);
        }
      );
    });
  }
}
