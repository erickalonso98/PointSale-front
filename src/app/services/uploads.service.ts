import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { global } from './global';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  public url:string;
  private _http = inject(HttpClient);
  private _userService = inject(UserService);

  constructor() {
    this.url = global.url;
   }

   public uploadsImage(id:string,photo:File):Observable<IUser> {
    const formData:FormData = new FormData();
    let headers = this._userService.gethHeadersFormsData();
    formData.append('photo', photo);
    return this._http.post<IUser>(`${this.url}/user/upload/${id}`, formData, { headers });
   }
}
