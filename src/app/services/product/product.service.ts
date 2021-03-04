import { Injectable } from '@angular/core';
import { Service } from '@services/service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FavoriteResp, AddFavoriteProductResp, ProductsResponse, RemoveFavoriteProductResp } from '@interfaces/product.interface';
import { Product } from '@interfaces/product.interface';
import { FilterProductResp } from '@interfaces/product.interface';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends Service{

  constructor(
    protected http: HttpClient,
    protected userService: UsuarioService,
  ){
    super(http);
  }

  private idUser: number;

  private setIdUser() {
    this.idUser = this.userService.getIdUser();

  }


  // Products By Store
  public getProductsByStore( idStore: any, page: number = 1, filter?: FilterProductResp ): Observable<ProductsResponse> {

    if (filter && Object.keys(filter).length > 0){
      return this.postQuery<ProductsResponse>(`stores/${idStore}/products_search?page=${page}`, filter);
    }

    return this.execQuery<ProductsResponse>(`stores/${idStore}/products?page=${page}`);

  }

  public getProductByStore( idStore: number, idProduct: number ): Observable<Product> {
    return this.execQuery<Product>(`stores/${idStore}/products/${idProduct}`);
  }

  // Como estos métodos utilizan el idUser, luego de probar con payment-process, aplicare aquí
  // la manera de trabajar con idUser
  // Favorite oF the user - Need to be log in
  public addProductToFavorite( idProduct: number ): Observable<AddFavoriteProductResp> {
    this.setIdUser();
    return this.postQuery<AddFavoriteProductResp>(`consumers/${this.idUser}/products/${idProduct}/favorites`, {});
  }

  public removeProductFromFavorite(idProduct: number): Observable<RemoveFavoriteProductResp>{
    this.setIdUser();
    return this.DeleteQuery<RemoveFavoriteProductResp>(`consumers/${this.idUser}/products/${idProduct}/favorites`);
  }

  public getFavoriteProducts(): Observable<FavoriteResp> {
    this.setIdUser();
    return this.execQuery<FavoriteResp>(`consumers/${this.idUser}/favorites`);
  }

}
