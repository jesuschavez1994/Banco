import { Injectable } from '@angular/core';
import { Category } from '@interfaces/categorys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { ServiceModule } from '@services/service.module'
@Injectable({
  providedIn: 'root'
})
export class GetCategorysService {

  constructor() { }
}
