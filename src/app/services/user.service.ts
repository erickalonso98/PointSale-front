import { Injectable,inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/User';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}
