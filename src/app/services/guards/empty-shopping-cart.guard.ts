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

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    console.log('EmptyShoppingCartGuard');

    console.log('existProduct');
    console.log(this.existProductsFromCart(state));

    // if (!existProduct) {
    //   console.log('Bloqueado por el EmptyShoppingCartGuard');
    //   // this.router.navigate(['/login'], {
    //   //   queryParams: {
    //   //     return: state.url
    //   //   }
    //   // });
    // }

    return this.existProductsFromCart(state);

  }

  private existProductsFromCart(state: RouterStateSnapshot): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      this.paymentService.getProductsFromCart().subscribe(resp => {

        if (resp.data) {

          if (resp.data.length > 0 ) {

            console.log('Paso por el EmptyShoppingCartGuard');
            // return true;
            resolve(true);

          }else{

            console.log('Bloqueado por el EmptyShoppingCartGuard');
            // return false;
            reject(false);

          }

        }else {

          console.log('Bloqueado por el EmptyShoppingCartGuard');
          // return false;
          reject(false);

        }

      }, () => {
        console.log('Bloqueado por el EmptyShoppingCartGuard');
        // return false;
        reject(false);
      });

    });

  }

}


// this.paymentService.getProductsFromCart().subscribe(resp => {

//   if (resp.data) {

//     if (resp.data.length > 0 ) {

//       console.log('Paso por el EmptyShoppingCartGuard');
//       return true;

//     }else{

//       console.log('Bloqueado por el EmptyShoppingCartGuard');

//       // this.router.navigate(['/login'], {
//       //   queryParams: {
//       //     return: state.url
//       //   }
//       // });

//       throw error;
//       return false;
//     }

//   }else {

//     console.log('Bloqueado por el EmptyShoppingCartGuard');

//     // this.router.navigate(['/login'], {
//     //   queryParams: {
//     //     return: state.url
//     //   }
//     // });

//     throw error;
//     return false;
//   }

// }, errorResp => {

//   throw error;
//   return false;

// });
