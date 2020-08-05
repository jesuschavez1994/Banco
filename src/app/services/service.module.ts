import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario/usuario.service';
import { ServicioService } from './servicio.service';
import { LoginGuardGuard } from './guards/login-guard.guard';


@NgModule({
  declarations: [],
  providers: [
    UsuarioService,
    ServicioService,
    LoginGuardGuard
  ],
  imports: [CommonModule],
  exports: []
})

export class ServiceModule { }
