import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/User';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {

  private _userService = inject(UserService);
  public users!:Array<IUser>;
  public status:string;
  public message!:string;

  constructor(){
    this.status = "success";
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(){
    this._userService.Users().subscribe(
      (response:any) => {
        if(response.status == this.status){
          this.users = response.users;
          this.message = response.message;
          console.log(this.users);
        }
      }
    );
  }

  public deleteUser(id:number){
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(id).subscribe(
          (response:any) => {
            if(response.status == this.status){
              Swal.fire({
                title: "Eliminado!",
                text: response.message,
                icon: response.status
              });
            }

            this.getUsers();
          }
        ); 
      }
    });
  }
}
