import { Component, OnInit, OnChanges ,Output, ViewChild, ElementRef } from '@angular/core';
import { GetCategorysService } from './services/get-categorys.service';
import { Category } from '@interfaces/categorys';
import { Router } from '@angular/router';
import {HomeServiceService} from '../services/home-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.scss']
})
export class CategorysComponent implements OnInit {
  userLog = false;

  constructor(private getCategorysService: GetCategorysService,
    private homeService: HomeServiceService,
              private router: Router,  ) { }

    ngOnInit(): void {

      this.userLog = this.homeService.islog();
    }
}
