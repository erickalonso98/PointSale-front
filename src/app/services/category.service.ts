import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { ICategory } from '../models/Category';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

public url: string;
private _userService = inject(UserService);
private _http = inject(HttpClient);

  constructor() { 
    this.url = global.url;
  }

  public categories():Observable<ICategory>{
    let headers = this._userService.getHeaders();
    return this._http.get<ICategory>(`${this.url}/categories`,{ headers });
  }

  public category(id:number):Observable<ICategory>{
    let headers = this._userService.getHeaders();
    return this._http.get<ICategory>(`${this.url}/categorie/${id}`,{ headers });
  }

  public createCategory(category:ICategory):Observable<ICategory>{
    let headers = this._userService.getHeaders();
    let params = JSON.stringify(category);
    return this._http.post<ICategory>(`${this.url}/create-category`,params,{ headers });
  }

  public updateCategory(category:ICategory,id:number):Observable<ICategory>{
    let headers = this._userService.getHeaders();
    let params = JSON.stringify(category);
    return this._http.put<ICategory>(`${this.url}/updated-category/${id}`,params,{ headers });
  }

  public destroyCategory(id:number):Observable<ICategory>{
    let headers = this._userService.getHeaders();
    return this._http.delete<ICategory>(`${this.url}/remove-category/${id}`, { headers });
  }

}
