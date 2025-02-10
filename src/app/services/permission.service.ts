import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { global } from './global';
import { IPermission } from '../models/Permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  public url:string;
  private _http = inject(HttpClient);
  private _userService = inject(UserService);

  constructor() {
    this.url = global.url;
   }

   public Permissions():Observable<IPermission>{
      let headers = this._userService.getHeaders();
      return this._http.get<IPermission>(`${this.url}/permissions/`,{ headers });
   }

   public Permission(id:number):Observable<IPermission>{
      let headers = this._userService.getHeaders();
      return this._http.get<IPermission>(`${this.url}/permission/${id}`,{ headers });
   }

   public createPermission(permission:IPermission):Observable<IPermission>{
      let json = JSON.stringify(permission);
      let headers = this._userService.getHeaders();
      return this._http.post<IPermission>(`${this.url}/permissions/create-permission/`,json,{ headers });
   }

   public updatePermission(permission:IPermission,id:number):Observable<IPermission>{
      let json = JSON.stringify(permission);
      let headers = this._userService.getHeaders();
      return this._http.put<IPermission>(`${this.url}/permissions/updated-permission/${id}`,json,{ headers });
   }

   public deletePermission(id:number):Observable<IPermission>{
      let headers = this._userService.getHeaders();
      return this._http.delete<IPermission>(`${this.url}/permissions/removed-permission/${id}`,{ headers });
   }
}
