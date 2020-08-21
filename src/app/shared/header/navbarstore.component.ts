import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-navbarstore',
  templateUrl: './navbarstore.component.html',
  styleUrls: ['./navbarstore.component.css']
})
export class NavbarstoreComponent implements OnInit {

  items: any = {};

  constructor(
    public userStoreServices: UserStoreService,
    public storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getUserConnet();
  }

  getUserConnet(){
    this.userStoreServices.getStore().subscribe( resp => {
      console.log(resp);
      this.items = resp;
      console.log(this.items);
  });
}

buscar( ){}

}
