import { Component, OnInit, Inject, Input  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-contact-description-edit',
  templateUrl: './contact-description-edit.component.html',
  styleUrls: ['../contact-information-edit/contact-information-edit.component.css']
})
export class ContactDescriptionEditComponent implements OnInit {

  @Input() forma: FormGroup;
  User: any =  localStorage.getItem('usuario');
  toObject = JSON.parse(this.User);
  usuario: Usuario;

  constructor() { this.usuario = this.toObject; }


  ngOnInit(): void {
  }

  editDescriptions(){}

  guardarCambios(){

  }

  onNoClick(): void {
  }

}
