import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../services/user-store/user-store.service';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-navbarstore',
  templateUrl: './navbarstore.component.html',
  styleUrls: ['./navbarstore.component.css']
})
export class NavbarstoreComponent implements OnInit {

  items: any =  localStorage.getItem('usuario');
  toObject = JSON.parse(this.items);

  constructor(
    public userStoreServices: UserStoreService,
    public storeService: StoreService
  ) { }

  ngOnInit(): void {
  }


buscar( ){}

}
