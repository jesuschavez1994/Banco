import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { Pelicula, RespuestaMDB} from '../../../interfaces/interfaces';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-public-views',
  templateUrl: './public-views.component.html',
  styleUrls: ['./public-views.component.css']
})
export class PublicViewsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

}
