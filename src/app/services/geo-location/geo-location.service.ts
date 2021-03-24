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

interface GeolocationPositions {
  readonly coords: GeolocationCoordinates;
  readonly timestamp: number;
}

interface GeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  /**
   * @description Usa el servicio de ubicación del navegador para obtener la ubicación actual del
   * usuario. El parametro de retorno contiene también la información necesaria para agregar
   * un marcador en el mapa en la ubicación actual.
   * @returns {*} Promise<Location>
   * @memberof GeoLocationService
   */
  getLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPositions) => {
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
