import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUser } from '../models/User';
import { global } from './global';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  private _http = inject(HttpClient);
  private _router = inject(Router);
  
  public token!:string;
  public identity:IUser;

  constructor() {
    this.url = global.url;
    this.identity = {} as IUser;
   }

   public Users(){
      let headers = this.getHeaders();
      return this._http.get<IUser>(`${this.url}/users/`,{ headers });
   }

   public User(id:number){
      let headers = this.getHeaders();
      return this._http.get<IUser>(`${this.url}/user/${id}`,{ headers });
   }

   public register(user:IUser){
      let json = JSON.stringify(user);
      let headers = this.getHeaders();
      return this._http.post<IUser>(`${this.url}/user/register/`,json,{ headers });
   }

  public login(email:string,password:string){
      let params = {
        email,
        password
      };

      let json = JSON.stringify(params);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post<IUser>(`${this.url}/user/login/`,json,{ headers });
  }

  public update(user:IUser,id:number){
      let headers = this.getHeaders();
      let json = JSON.stringify(user);
      return this._http.put<IUser>(`${this.url}/user/update-user/${id}`,json,{ headers });
  }

  public deleteUser(id:number){
      let headers = this.getHeaders();
      return this._http.delete<IUser>(`${this.url}/user/removed-user/${id}`,{ headers });
  }

  public getToken(){
    let token = localStorage.getItem('token');

    if(token && token != "undefined"){
      this.token = token;
    }else{
      this.token = "";
    }

    return this.token;
  }

  public getIdentity(){
    let identity = localStorage.getItem("identity");

    if(identity && identity != "undefined"){
      this.identity = identity = JSON.parse(identity);
    }else{
      this.identity = {} as IUser;
    }

    return this.identity;
  }

  public getHeaders(){
    let token = this.getToken();

    if(token){
       return new HttpHeaders({'Authorization':`Bearer ${token}`}).set('Content-Type','application/json');
    }else{
       return new HttpHeaders();
    }
 }

 public logout(){
  Swal.fire({
    title: "¿Quieres salir del sistema?",
    text: "La sesión actual se cerrará y saldrás del sistema",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Salir!",
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if(result.isConfirmed){
      localStorage.removeItem('token');
      localStorage.removeItem('identity');
      this.token = "";
      this.identity = {} as IUser;
      this._router.navigate(["/login"]);
    }
  });
 }

}
