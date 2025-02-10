import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { IProvider } from '../models/Provider';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  public url: string
  private _http = inject(HttpClient);
  private _userService = inject(UserService);

  constructor() { 
    this.url = global.url
  }

  public Providers():Observable<IProvider>{
      let headers = this._userService.getHeaders();
      return this._http.get<IProvider>(`${this.url}/providers`,{ headers });
  }

  public Provider(id:number):Observable<IProvider>{
      let headers = this._userService.getHeaders();
      return this._http.get<IProvider>(`${this.url}/provider/${id}`,{ headers });
  }

public createProvider(provider:IProvider):Observable<IProvider>{
    let params = JSON.stringify(provider);
    let headers = this._userService.getHeaders();
    return this._http.post<IProvider>(`${this.url}/create-provider`,params,{ headers });
}

public updateProvider(provider:IProvider,id:number):Observable<IProvider>{
    let params = JSON.stringify(provider);
    let headers = this._userService.getHeaders();
    return this._http.put<IProvider>(`${this.url}/updated-provider/${id}`,params,{ headers });
}

public destroyProvider(id:number):Observable<IProvider>{
    let headers = this._userService.getHeaders();
    return this._http.delete<IProvider>(`${this.url}/remove-provider/${id}`,{ headers });
}

}
