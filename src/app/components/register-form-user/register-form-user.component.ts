import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form-user',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './register-form-user.component.html',
  styleUrl: './register-form-user.component.css'
})
export class RegisterFormUserComponent {

  private _userService = inject(UserService);
  public user!:IUser;
  public message:string
  public status!:string;

  constructor(){
    this.user = {} as IUser;
    this.message = "";
    this.status = "success";
  }

  public onSubmit(form:NgForm):void{
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      (response:any) => {
        if(response.status == this.status){
          console.log(response);
          this.message = response.message;
          this.status = "success";
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
