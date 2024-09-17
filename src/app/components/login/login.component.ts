import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/User';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    public title:string;
    private _userService = inject(UserService);
    private _router = inject(Router);
    public user:IUser;

    public token!:string;

    constructor(){
      this.title = 'Login';
      this.user = {} as IUser;
    }

    public onSubmit(form:NgForm):void{

      console.log("correo "+this.user.email);
      console.log("password "+this.user.password);
      
      this._userService.login(this.user.email,this.user.password).subscribe(
        (response:any) => {
            if(response.status == "success"){
 
              this.token = response.token;
              console.log(this.token);
              localStorage.setItem("token",this.token);

              this._router.navigate(['/Dashboar-Admin']);

            }
            form.reset();
        },
        (error:any) => {
          if(error.error.status == "error"){
            Swal.fire({
              icon: error.error.status,
              title: "Oops...",
              text: error.error.message
            });
          }
        }
      );
    }

}
