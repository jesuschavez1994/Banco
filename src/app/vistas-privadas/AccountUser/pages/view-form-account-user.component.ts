import { Component, OnInit } from '@angular/core';
import {HomeServiceService} from '../../../vistas-publicas/services/home-service.service';

@Component({
  selector: 'app-view-form-account-user',
  templateUrl: './view-form-account-user.component.html',
  styleUrls: ['./view-form-account-user.component.scss']
})
export class ViewFormAccountUserComponent implements OnInit {

  userLog: boolean;
  storeLog: boolean | string;

  constructor(private homeService: HomeServiceService) { }

  ngOnInit(): void {
    this.userLog = this.homeService.islog();
    this.storeLog = this.homeService.storeActive();
  }

}
