import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-account-user',
  templateUrl: './form-account-user.component.html',
  styleUrls: ['./form-account-user.component.scss']
})
export class FormAccountUserComponent implements OnInit {

  forma: FormGroup;

  constructor() {

    this.forma = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      password1: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

  }

  ngOnInit(): void {
  }

}
