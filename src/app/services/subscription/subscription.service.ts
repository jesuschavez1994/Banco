/* 
Servicio donde se implementará la lógica referente a la suscripción de los planes y sus respectivas pasarelas de pago. 
*/
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { BROWSER_STORAGE } from '../../browserStorage';
import {
  OrderNumberCreation,
  CreatedOrder,
} from '@interfaces/SettingsInterfaces';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(
    private httpService: HttpClient,
    @Inject(BROWSER_STORAGE) private localStorage: Storage
  ) {}

  private apiBaseURL = URL_SERVICIOS;
  private userId = this.localStorage.getItem('id');
  private token = this.localStorage.getItem('token');

  public createOrderNumber(
    planDetails: OrderNumberCreation
  ): Promise<CreatedOrder> {
    const url = `${this.apiBaseURL}/api/users/${this.userId}/orders`;
    // We add the corresponding headers to the request
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.httpService
      .post(url, planDetails, httpOptions)
      .toPromise()
      .then((response) => response as CreatedOrder)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Something has gone wrong: ', error);
    return Promise.reject(error.message || error);
  }
}
