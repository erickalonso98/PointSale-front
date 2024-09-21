import { Component,inject,OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form-update',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './user-form-update.component.html',
  styleUrl: './user-form-update.component.css'
})
export class UserFormUpdateComponent implements OnInit{

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _userService = inject(UserService);
  public user:IUser;
  public status:string;
  public message!:string

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

  public onSubmit(form:NgForm):void{
    this._userService.update(this.user,this.user.id).subscribe(
      (response:any) => {
        if(response.status == this.status){
          this.message = response.message;
          Swal.fire({
            title: "¡Enhorabuena!",
            text: this.message,
            icon:  response.status
          });

          this._router.navigate(["/users"]);
        }
      }
    );
  }
}
