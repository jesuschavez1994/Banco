import { Component, OnInit, Input } from '@angular/core';

import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-photo-user',
  templateUrl: './photo-user.component.html',
  styleUrls: ['./photo-user.component.css']
})
export class PhotoUserComponent implements OnInit {


  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {

  }


}
