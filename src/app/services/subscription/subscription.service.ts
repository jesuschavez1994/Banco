/* 
Servicio donde se implementará la lógica referente a la suscripción de los planes y sus respectivas pasarelas de pago. 
*/
import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { BROWSER_STORAGE } from '../../browserStorage';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
  OrderNumberCreation,
  CreatedOrder,
  Payment,
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

  createOrderNumber(planDetails: OrderNumberCreation) {
    const url = `${this.apiBaseURL}/api/users/${this.userId}/orders`;
    // We add the corresponding headers to the request
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.httpService
      .post<CreatedOrder>(url, planDetails, httpOptions)
      .pipe(catchError(this.handleError));
  }

  paymentCreation(userId: number, orderId: number) {
    const url = `${this.apiBaseURL}/api/users/${userId}/orders/${orderId}/payments`;
    // We add the corresponding headers to the request
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };

    return this.httpService
      .post<Payment>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Manejamos los errores que ocurran del lado del cliente.
      console.error('An error occurred:', error.error.message);
    } else {
      // El servidor respondió con un codigo no satisfactorio.
      // EL cuerpo de la respuesta contiene la información de lo que salió mal.
      console.error(
        `El servidor regresó el codigo: ${error.status}, ` +
          `el cuerpo de la respuesta fue:: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Algo malo ha sucedido, por intente de nuevo mas tarde.');
  }
}
