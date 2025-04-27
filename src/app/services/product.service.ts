import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { IProduct } from '../models/Product';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url:string;
 
  private _http = inject(HttpClient);
  private _userService = inject(UserService);

  constructor() { 
    this.url = global.url;
  }

    public products():Observable<IProduct>{
      let headers = this._userService.getHeaders();
      return this._http.get<IProduct>(`${this.url}/products/`,{ headers });
    }

    public product(id:number):Observable<IProduct>{
      let headers = this._userService.getHeaders();
      return this._http.get<IProduct>(`${this.url}/product/${id}`,{ headers });
    }

    public createProduct(product:IProduct):Observable<IProduct>{
      let headers = this._userService.getHeaders();
      let params = JSON.stringify(product);
      return this._http.post<IProduct>(`${this.url}/create-product/`,params,{ headers });
    }

  public updateProduct(product:IProduct,id:number):Observable<IProduct>{
      let headers = this._userService.getHeaders();
      let params = JSON.stringify(product);
      return this._http.put<IProduct>(`${this.url}/updated-product/${id}`,params,{ headers });
  }

  public destroyProduct(id:number):Observable<IProduct>{
    let headers = this._userService.getHeaders();
    return this._http.delete<IProduct>(`${this.url}/removed-product/${id}`,{ headers });
  }

  /*
  public UploadImage(formData:FormData):Observable<any>{
    let headers = this._userService.getHeaders();
    return this._http.post<FormData>(`${this.url}/product/upload/`,formData,{ headers });
  }*/

}
