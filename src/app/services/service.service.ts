import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(protected http: HttpClient){}

  // Read
  protected execQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.get<T>( query );
  }

  // Create or Update
  protected postQuery<T>(query: string, data: any){
    query = apiUrl + query;
    return this.http.post<T>( query, data );
  }

  // Delete
  protected DeleteQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.delete<T>( query );
  }

}
