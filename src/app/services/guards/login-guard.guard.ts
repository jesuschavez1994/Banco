import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../store/store.service';



@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate, CanLoad {

  constructor(private storeService: StoreService) {
    this.storeService.cargarStorage();
  }

  canActivate() {

    this.storeService.cargarStorage();

    if ( this.storeService.estaLogueado() ){
      console.log('Paso por el login Guard');
      return true;
    }else{
      console.log('Bloqueado por el  Guard');
      return false;
    }

  }

  canLoad() {

    if ( this.storeService.estaLogueado() ){
      console.log('Paso por el login Guard');
      return true;
    }else{
      console.log('Bloqueado por el  Guard');
      return false;
    }

  }

}
