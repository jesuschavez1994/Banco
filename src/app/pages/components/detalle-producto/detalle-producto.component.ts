import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicViewsComponent } from '../../../pages/components/public-views/public-views.component';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: any = {};
  loadcard: boolean;


  constructor(  private activatedRoute: ActivatedRoute,
                private publicViews: PublicViewsComponent,
                private services: ServicioService
              ) {

    this.loadcard = true;
    this.activatedRoute.params.subscribe( params => {
      // console.log(params['id']);
      this.services.getproducto(params['id']).subscribe( producto => {
        setTimeout(() => {
          this.producto = producto;
          this.loadcard = false;
        }, 2000);
      });
    });
  }

  ngOnInit(): void {
  }

}
