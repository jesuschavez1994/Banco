import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  // Esto
  private ejecutarQuery<T>(query: string){
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get( query );
  }

  constructor(private http: HttpClient) { }

  // Esto no se si esta de más
  getFeatures(){
    return this.ejecutarQuery('/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2020-07-30');
  }

  getproducto(id: string){
    // tslint:disable-next-line: max-line-length
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=aac1706fe8a46b5700714aead65c5e39`);
  }

  buscarProducto(texto: string){
    return this.ejecutarQuery(`/search/movie?query=${ texto }`);
  }


}
