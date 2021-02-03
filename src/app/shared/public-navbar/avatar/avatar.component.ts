import { Component, OnInit } from '@angular/core';
import { StoreService } from '@services/store/store.service';
import { UsuarioService } from '@services/usuario/usuario.service';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  userId: number | string;
          userImg: any;
  constructor(private auth: StoreService, public userService: UsuarioService) {
    this.imgUser();
  }

  ngOnInit(): void {

  }
  imgUser(){
    if (this.auth){
      this.userId = localStorage.getItem('id');
      this.userService.datosUserImages(this.userId).subscribe(
        data => {
          this.userImg = data;
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
