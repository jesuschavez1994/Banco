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

  async canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('EmptyShoppingCartGuard');

    console.log('existProduct');
    const isEmptyShoppingCart = await this.paymentService.getProductsFromCart().subscribe(resp => {

      return false;
      // if (resp.data) {

      //   if (resp.data.length > 0 ) {

      //     console.log('Paso por el EmptyShoppingCartGuard');
      //     return true;

      //   }else{

      //     console.log('Bloqueado por el EmptyShoppingCartGuard');
      //     // return false;
      //     const error = new Error();
      //     error.message = 'block';
      //     throw error;

      //   }

      // }else {

      //   console.log('Bloqueado por el EmptyShoppingCartGuard');
      //   // return false;
      //   const error = new Error();
      //   error.message = 'block';
      //   throw error;

      // }

    }, () => {
      console.log('Bloqueado por el EmptyShoppingCartGuard');
      // return false;
      const error = new Error();
      error.message = 'block';
      throw error;

    });

    console.log(isEmptyShoppingCart);

    return true;

  }

  // private existProductsFromCart(state: RouterStateSnapshot): Promise<boolean> {


  // }

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
