import { Component,inject,OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RolesService } from '../../services/roles.service';
import { IRole } from '../../models/Role';
import { IUser } from '../../models/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-form-update',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './role-form-update.component.html',
  styleUrl: './role-form-update.component.css'
})
export class RoleFormUpdateComponent implements OnInit {

  private _userService = inject(UserService);
  private _roleService = inject(RolesService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  public title:string;
  public role:IRole;
  public users!:Array<IUser>;
  public status:string;
  public message:string;
  

  constructor(){
    this.title = "Actualizar Rol";
    this.status = "success";
    this.message = "";
    this.role = {} as IRole;
  }

  ngOnInit(): void {
    this.getRole();
    this.getUsers();
  }

  public getRole():void{
    this._route.params.subscribe((params) => {
        let id = +params['id'];
        this._roleService.Role(id).subscribe(
          (response:any) => {
            if(response.status == this.status){
              this.role = response.role;
              console.log(this.role);
            }else{
              this._router.navigate(['/roles']);
            }
          }
        );
    });
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

  public onSubmit(form:NgForm){
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      denyButtonText: `no guardar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._roleService.updateRole(this.role,this.role.id).subscribe(
          (response:any) => {
            if(response.status == this.status){
              this.message = response.message;
              Swal.fire({
                title: "¡Enhorabuena!",
                text: this.message,
                icon:  response.status
              });
            }

            this._router.navigate(["/roles"]);
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se actualizaron", "", "info");
      }
    });
  }

}
