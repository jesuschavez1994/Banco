import { Component, OnInit } from '@angular/core';
import {HomeServiceService} from '../../services/home-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userLog: boolean;
  storeLog: boolean | string;
  constructor(private homeService: HomeServiceService,) { }

  ngOnInit(): void {
    this.userLog = this.homeService.islog();
    this.storeLog= this.homeService.storeActive();
  }

}
