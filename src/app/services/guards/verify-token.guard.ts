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

    console.log('Verifica Token', this.auth.token);

    let token = this.auth.token;

    if(this.auth.token){

      var payload = JSON.parse(atob(token.split('.')[1]));

      var expirado = this.expirado( payload.exp );

      return this.verificaRenueva( payload.exp );

    }
    

    if ( expirado ) {
      
      this.auth.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('storeId');
      localStorage.removeItem('id');

      this.router.navigate(['/login']);
      console.log('Token Expirado');
      return false;
    }

    console.log('Payload', payload);

    return true

  }


  expirado( fechaExp: number ) {

    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    }else {
      return false;
    }

  }

  verificaRenueva( fechaExp: number ): Promise<boolean>  {

    return new Promise( (resolve, reject) => {

      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

      console.log('tokenExp',  tokenExp );
      console.log('ahora', ahora );
      console.log('Get Time', ahora.getTime())
      console.log('Token Expira', tokenExp.getTime())

      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else {

        this.auth.renuevaToken(localStorage.getItem('id'))
              .subscribe( () => {
                console.log('Token renovado')
                resolve(true);
              }, () => {
                this.router.navigate(['/login']);
                reject(false);
              });

      }

    });

  }
  
}
