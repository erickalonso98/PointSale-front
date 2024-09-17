import { Component,inject,OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/User';
@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {

  private _userService = inject(UserService);
  public users!:Array<IUser>;

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(){
    this._userService.Users().subscribe(
      (response:any) => {
        if(response.status == "success"){
          this.users = response.users;
          console.log(this.users);
        }
      }
    );
  }
}
