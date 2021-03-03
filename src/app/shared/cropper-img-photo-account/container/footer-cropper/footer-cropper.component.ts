import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsuarioService } from '@services/usuario/usuario.service';
import { Avatar } from '@models/avatar.model';

@Component({
  selector: 'app-footer-cropper',
  templateUrl: './footer-cropper.component.html',
  styleUrls: ['./footer-cropper.component.scss']
})
export class FooterCropperComponent implements OnInit {

  // Entradas //
  @Input() SaveImage: any ;
  @Input() NameFile: string;

  // Salidas//
  @Output() CambiarImg = new EventEmitter<boolean>();
  @Output() stateSippner = new EventEmitter<boolean | any>();

  // Variables //
  spinner = false;
  AlertSucces = false;
  ErrorAlert = false ;
  state = false;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  save(){

    this.stateSippner.emit({
      spinner: this.spinner = true,
      AlertSucces: this.AlertSucces = false,
      ErrorAlert: this.ErrorAlert = false
    });

    const avatar = new Avatar(
      this.SaveImage, this.NameFile
    );

    this.usuarioService.ImagenPerfil(avatar, localStorage.getItem('id')).subscribe((Response: any) => {
      console.log('Response Avatar', Response.src);
      setTimeout(() => this.stateSippner.emit({
        spinner: this.spinner = false,
        AlertSucces: this.AlertSucces = true
      }), 0);
    }, error => {

      this.ErrorAlert = true

      setTimeout(() => this.stateSippner.emit({
        spinner: this.spinner = false,
        AlertSucces: this.AlertSucces = false,
        ErrorAlert: this.ErrorAlert = true
      }), 0);
      
    });

  }

  cambiarImg(){
    this.state = !this.state;
    this.CambiarImg.emit(this.state);
  }

}
