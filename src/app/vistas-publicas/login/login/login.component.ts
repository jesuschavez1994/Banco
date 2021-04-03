import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UserStoreService } from '@services/user-store/user-store.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRecoverPasswordComponent } from '../container/modal-recover-password/modal-recover-password.component';
import { ModalRegisterComponent } from '@shared/modal-register/modal-register.component';

import { HomeServiceService } from '../../services/home-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario;
  isChecked = false;
  email: string;
  token: string;
  urlReturn = '';
  ErrorMessage: string = '';
  OnError: boolean = false;

  userLog: boolean;
  storeLog: boolean | string;
  constructor(
    private homeService: HomeServiceService,
    public usuarioServices: UsuarioService,
    public router: Router,
    public userStoreService: UserStoreService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.forma = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      recuerdame: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => (this.urlReturn = params.return || '/home')
    );
    this.userLog = this.homeService.islog();
    this.storeLog = this.homeService.storeActive();
  }

  loginRegister() {
    // tslint:disable-next-line: prefer-const
    let usuario = new Usuario(
      (this.forma.value.username = null),
      (this.forma.value.name = null),
      this.forma.value.email,
      this.forma.value.password
    );

    this.usuarioServices
      .login(usuario, this.forma.value.recuerdame)
      .subscribe((resp: any) => {
        console.log(this.forma.value.recuerdame);
        console.log('FFFF', resp);
        if (resp.mensaje) {
          console.log(resp.mensaje);
          this.OnError = true;
          this.ErrorMessage = resp.mensaje;
        }
        this.guardarStorage(resp.remember_token, resp.user.id);
        console.log(resp);
        if (resp.user.role === 'store') {
          this.userStoreService
            .getStoreAccountEdit(resp.user.id)
            .subscribe((StoreResponse: any) => {
              console.log('StoreResponse', StoreResponse);
              this.guardarStorageStore(StoreResponse['0'].social.store_id);
              this.router.navigate(['account/settings/store-edit']);
            });
        }

        if (resp.user.role === 'admin') {
          this.router.navigate(['admin']);
        }
        if (resp.user.role === 'user') {
          this.guardarStorage(resp.remember_token, resp.user.id);
          this.router.navigate(['account/settings-user']);
        }

        console.log('You Are Going To: ', this.urlReturn);
        // this.router.navigateByUrl(this.urlReturn);
      });
  }

  Ingresar() {}

  guardarStorage(token: string, id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    // localStorage.setItem('storeId', storeId);
    this.token = token;
  }

  guardarStorageStore(storeId: string) {
    localStorage.setItem('storeId', storeId);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalRecoverPasswordComponent, {
      height: '250px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(ModalRegisterComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'custom-modalbox',
    });
  }
}
