import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { IClient } from '../models/Client';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public url!:string
  private _userService = inject(UserService);
  private _http = inject(HttpClient);

  constructor() {
    this.url = global.url;
   }

   public Clients():Observable<IClient>{
      let headers = this._userService.getHeaders();
      return this._http.get<IClient>(`${this.url}/clients/`,{ headers });
   }

   public Client(id:number):Observable<IClient>{
      let headers = this._userService.getHeaders();
      return this._http.get<IClient>(`${this.url}/client/${id}`,{ headers });
   }

   public createClient(client:IClient):Observable<IClient>{
      let params = JSON.stringify(client);
      let headers = this._userService.getHeaders();
      return this._http.post<IClient>(`${this.url}/create-client/`,params,{ headers });
   }

   public updateClient(client:IClient,id:number):Observable<IClient>{
      let params = JSON.stringify(client);
      let headers = this._userService.getHeaders();
      return this._http.put<IClient>(`${this.url}/updated-client/${id}`,params,{ headers });
   }

   public deleteClient(id:number):Observable<IClient>{
      let headers = this._userService.getHeaders();
      return this._http.delete<IClient>(`${this.url}/deleted-client/${id}`,{ headers });
   }
}
