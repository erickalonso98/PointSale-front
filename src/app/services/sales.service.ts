import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { ISale } from '../models/Sale';
import { global } from './global';
@Injectable({
  providedIn: 'root'
})
export class SalesService {

  public url:string;

  private _http = inject(HttpClient);
  private _userService = inject(UserService);

  constructor() {
    this.url = global.url;
   }

   public Sales():Observable<ISale>{
      let headers = this._userService.getHeaders();
      return this._http.get<ISale>(`${this.url}/sales/`,{ headers });
   }

   public Sale(id:number):Observable<ISale>{
      let headers = this._userService.getHeaders();
      return this._http.get<ISale>(`${this.url}/sale/${id}`,{ headers });
   }

  public createSale(sale:any):Observable<ISale>{
    let params = JSON.stringify(sale);
    let headers = this._userService.getHeaders();
    return this._http.post<ISale>(`${this.url}/sale/create-new-sale/`,params,{ headers });
  }

  public updateSale(sale:any,id:number):Observable<ISale>{
    let params = JSON.stringify(sale);
    let headers = this._userService.getHeaders();
    return this._http.put<ISale>(`${this.url}/sale/updated-sales/${id}`,params,{ headers });
  }
   
}
