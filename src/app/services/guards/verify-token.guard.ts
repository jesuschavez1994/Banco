import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../store/store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

  constructor(public auth: StoreService, public router: Router){}

  canActivate(): Promise<boolean> | boolean {

    console.log('Verifica Token');

    let token = this.auth.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expirado = this.expirado( payload.exp );

    if ( expirado ) {
      this.router.navigate(['/login']);
      console.log('Token Expirado');
      return false;
    }

    console.log('Payload', payload);

    return true;

  }

  expirado( fechaExp: number ) {

    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    }else {
      return false;
    }


  }
  
}
