import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, } from '@angular/forms';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { UserStore } from '../../models/user-store.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  forma: FormGroup;
  items: any = {};
  imagenSubir: File;

  constructor(
    public userStoreServices: UserStoreService, public storeService: StoreService,
  ) {

    this.forma = new FormGroup({

      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('' , [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
});

  }

  ngOnInit() {
    this.getUserConnet();
  }

async getUserConnet(){
  try{
    await this.userStoreServices.getStore().subscribe( resp => {
      console.log(resp);
      this.items = resp;
    });
  }catch (err){
    console.log(err);
  }
}

ActualizarDatosUser(){

  const negocio = new UserStore(
    this.forma.value.name,
    this.forma.value.email,
    this.forma.value.phone,
    this.forma.value.password,
    this.forma.value.password,
  );

  this.userStoreServices.putDatos(localStorage.getItem('id')).subscribe( data => {
    console.log(data);
  });

}



}
