import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentProcessService } from '../payment-process/payment-process.service';

@Injectable({
  providedIn: 'root'
})
export class EmptyShoppingCartGuard implements CanActivate {

  constructor(
    private router: Router,
    private paymentService: PaymentProcessService,
  ){}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    console.log('EmptyShoppingCartGuard');

    return this.hasProductsFromCart().then( resp => true ).catch(error => {

      this.router.navigate(['/home'], {
        queryParams: {
          return: state.url
        }
      });

      return false;
    });

  }

  private hasProductsFromCart(): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      this.paymentService.getProductsFromCart().subscribe( resp => {

        if (resp.data) {

          if (resp.data.length > 0 ) {

            console.log('Paso por el EmptyShoppingCartGuard');
            resolve(true);

          }

          console.log('Bloqueado por el EmptyShoppingCartGuard');
          reject(false);

        }

        console.log('Bloqueado por el EmptyShoppingCartGuard');
        reject(false);

      }, error => {

        reject(false);

      });

    });
  }

}
