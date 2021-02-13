import { Component, OnInit } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { HomeServiceService } from "../../../vistas-publicas/services/home-service.service";
import { environment } from '@environments/environment';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  userId: number | string;
  userImg: any;
  userName: string;
  userEmail: string;
  envApi= environment.url;

  storeAct: boolean | string = false;
  constructor(private auth: StoreService, public homeService: HomeServiceService,) {
    this.imgUser();
  }

  ngOnInit(): void {
    this.storeAct= this.homeService.storeActive();
  }
  imgUser(){
    if(this.auth){
      this.userId= localStorage.getItem('id');
      this.homeService.obtUserData(this.userId).subscribe(
        data=>{
          
           this.userImg=data.image;
           this.userEmail= data.email;
           this.userName= data.name;
          console.log(data);
        }
      );
    }
  } 
  logout(){
    this.auth.logout();
   // window.location.reload();
  }
}
