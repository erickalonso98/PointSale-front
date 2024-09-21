import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { IRole } from '../models/Role';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public url:string;
  private _userService = inject(UserService);
  private _http = inject(HttpClient);

  constructor() {
    this.url = global.url;
   }

   public Roles(){
    let headers = this._userService.getHeaders();
    return this._http.get<IRole>(`${this.url}/roles/`,{ headers });
   }

   public Role(id:number){
    let headers = this._userService.getHeaders();
    return this._http.get<IRole>(`${this.url}/role/${id}`,{ headers });
   }

   public createRole(role:IRole){
      let json = JSON.stringify(role);
      let headers = this._userService.getHeaders();
      return this._http.post<IRole>(`${this.url}/roles/create-role/`,json,{ headers });
   }

   public updateRole(role:IRole,id:number){
      let json = JSON.stringify(role);
      let headers = this._userService.getHeaders();
      return this._http.put<IRole>(`${this.url}/roles/updated-role/${id}`,json,{ headers });
   }

   public deleteRole(id:number){
      let headers = this._userService.getHeaders();
      return this._http.delete<IRole>(`${this.url}/role/removed-role/${id}`,{ headers });
   }
}
