import { Component,inject,OnInit,DoCheck } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { IUser } from './models/User';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,DoCheck {

  private _userService = inject(UserService);
  public token!:string;
  public identity!:IUser;

  constructor(){

  }

  ngDoCheck(): void {
    this.getDateToken();
  }

  ngOnInit(): void {
    
  }

  public getDateToken():void{
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  
}
