import { Component,inject,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router,ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule,NgForm } from '@angular/forms';
import { PermissionService } from '../../services/permission.service';
import { IPermission } from '../../models/Permission';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permission-update-form',
  standalone: true,
  imports: [SidebarComponent,FormsModule,RouterLink, RouterLinkActive],
  templateUrl: './permission-update-form.component.html',
  styleUrl: './permission-update-form.component.css'
})
export class PermissionUpdateFormComponent implements OnInit {

  private _permissionService = inject(PermissionService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  public permission:IPermission;
  public message:string
  public status!:string;

  constructor(){
    this.permission = {} as IPermission;
    this.message = "";
    this.status = 'success';
  }

  ngOnInit(): void {
    this.getPermission();
  }

  public getPermission():void{
    this._route.params.subscribe((params) => {
      var id = +params["id"];
      this._permissionService.Permission(id).subscribe(
        (response:any) => {
          if(response.status == this.status){
              this.permission = response.permission;
              console.log(this.permission);
          }else{
            this._router.navigate(["/permissions"]);
          }
        }
      );
    });
  }

  public onSubmit(form:NgForm):void{
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      denyButtonText: `no guardar`,
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
        if(result.isConfirmed){
          this._permissionService.updatePermission(this.permission,this.permission.id).subscribe(
            (response:any) => {
              if(response.status == this.status){
                this.message = response.message;
                Swal.fire({
                  title: "¡Enhorabuena!",
                  text: this.message,
                  icon:  response.status
                });
              }

              this._router.navigate(["/permissions"]);
            }
          );
        }else if (result.isDenied) {
          Swal.fire("Los cambios no se actualizaron", "", "info");
        }
    });
  }

}
