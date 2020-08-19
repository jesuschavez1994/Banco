import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { UserStoreService } from '../../services/user-store/user-store.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


items: any = {};


constructor(public userStoreServices: UserStoreService) { }

ngOnInit() {
    this.getUserConnet();
  }

getUserConnet(){
    this.userStoreServices.getStore().subscribe( resp => {
      console.log(resp);
      this.items = resp;
    });
}

}
