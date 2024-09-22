import { Component,inject,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/User';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [SidebarComponent,RouterLink, RouterLinkActive],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit{

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _userService = inject(UserService);
  public user:IUser;
  public status:string;

  constructor(){
    this.status = "success";
    this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(){
    this._route.params.subscribe((params) => {
      let id = +params['id'];
      this._userService.User(id).subscribe(
        (response:any) => {
          if(response.status == this.status){
            this.user = response.user;
            console.log(this.user);
          }else{
            this._router.navigate(["/users"]);
          }
        }
      );
    });
  }

}
