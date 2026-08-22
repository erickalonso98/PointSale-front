import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from '../models/Company';
import { global } from './global';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public url!:string;
  private _http = inject(HttpClient);
  private _userService = inject(UserService);

  constructor() {
    this.url = global.url;
   }

   public Companies():Observable<ICompany>{
    let headers = this._userService.getHeaders();
    return this._http.get<ICompany>(`${this.url}/companies/`,{ headers });
   }

   public companie(id:number):Observable<ICompany>{
    let headers = this._userService.getHeaders();
    return this._http.get<ICompany>(`${this.url}/company/${id}`,{ headers });
   }

   public createCompany(company:ICompany):Observable<ICompany>{
    let headers = this._userService.getHeaders();
    return this._http.post<ICompany>(`${this.url}/create-company`,company,{ headers });
   }

   public modifyCompany(id:number, company:ICompany):Observable<ICompany>{
    let headers = this._userService.getHeaders();
    return this._http.put<ICompany>(`${this.url}/updated-company/${id}`,company,{ headers });
   }

   public destroyCompany(id:number):Observable<ICompany>{
    let headers = this._userService.getHeaders();
    return this._http.delete<ICompany>(`${this.url}/remove-company/${id}`,{ headers });
   }
}
