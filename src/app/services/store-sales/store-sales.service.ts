import { Injectable } from '@angular/core';
import { Service } from '@services/service.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Orders } from '@interfaces/shopping-cart/shopping-cart.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreSalesService extends Service {
  constructor(
    protected http: HttpClient,
    protected userService: UsuarioService
  ) {
    super(http);
  }

  private userId: number;
  private storeId: string;

  setIdUser() {
    this.userId = this.userService.getIdUser();
  }

  /**
   * @description Obtenemos todas las ordenes de compra realizadas a la tienda.
   * @returns {*}
   * @memberof StoreSalesService
   */
  public getStoreOrders() {
    this.setIdUser();
    this.storeId = localStorage.getItem('storeId');
    return this.execQuery<Orders>(
      `users/${this.userId}/stores/${this.storeId}/sales`
    );
  }
}
