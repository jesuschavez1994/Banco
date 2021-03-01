import { Component, OnInit, ViewChild } from '@angular/core';
import {HomeServiceService} from '../../../vistas-publicas/services/home-service.service';
import { SidebarMenuOptions } from '@interfaces/components-options/sidebar-menu.options.interface';
import { CropperImgPhotoAccountComponent } from '../../../shared/cropper-img-photo-account/cropper-img-photo-account.component';

@Component({
  selector: 'app-view-form-account-user',
  templateUrl: './view-form-account-user.component.html',
  styleUrls: ['./view-form-account-user.component.scss']
})
export class ViewFormAccountUserComponent implements OnInit {

  userLog: boolean;
  storeLog: boolean | string;
  imgCropper: any


  menuOptions: SidebarMenuOptions[] = [
    {
      label: 'Mi cuenta',
      iconClass: 'fas fa-cog',
      routerLink: ['/account/form-account'],
      // isActive: false,
    },
    {
      label: 'Mis compras',
      iconClass: 'fas fa-handshake',
      routerLink: [''],
      // isActive: false,
    },
  ];

  constructor(private homeService: HomeServiceService) { }

  ngOnInit(): void {
    this.userLog = this.homeService.islog();
    this.storeLog = this.homeService.storeActive();
  }

  Img(event){
    this.imgCropper = event;
    console.log(event);
  }

}
