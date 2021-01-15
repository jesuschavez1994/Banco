/* 
Servicio donde se implementará la lógica referente a la suscripción de los planes y sus respectivas pasarelas de pago. 
*/
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private httpService: HttpClient) {}

  private apiBaseURL = URL_SERVICIOS;
  private userId = localStorage.getItem('id');
  private token = localStorage.getItem('token');

  public createOrderNumber(planDetails: Object): Promise<Object> {
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
      .then((response) => response as Object)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Something has gone wrong: ', error);
    return Promise.reject(error.message || error);
  }
}
