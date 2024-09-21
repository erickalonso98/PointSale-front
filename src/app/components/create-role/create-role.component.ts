import { Component,inject,OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RolesService } from '../../services/roles.service';
import { IRole } from '../../models/Role';
import { IUser } from '../../models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent implements OnInit {

  private _userService = inject(UserService);
  private _roleService = inject(RolesService);
  public title:string;
  public users!:Array<IUser>;
  public role:IRole;
  public status:string;
  public message:string;

  constructor(){
    this.title = "Registrar Rol de usuario";
    this.status = "success";
    this.message = "";
    this.role = {} as IRole;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers():void{
    this._userService.Users().subscribe(
      (response:any) => {
        if(response.status == this.status){
          this.users = response.users;
          console.log(this.users);
        }
      }
    );
  }

  public onSubmit(form:NgForm):void{
    this._roleService.createRole(this.role).subscribe(
      (response:any) => {
        if(response.status == this.status){
          this.message = response.message;
          Swal.fire({
            title: "¡Enhorabuena!",
            text: this.message,
            icon:  response.status
          });
        }
        form.reset();
      }
    );
  }
  
}
