import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { IPermission } from '../../models/Permission';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-permissions',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './list-permissions.component.html',
  styleUrl: './list-permissions.component.css'
})
export class ListPermissionsComponent implements OnInit {

  public status:string;
  public permissions!:Array<IPermission>;
  public message!:string;
  private _permissionService = inject(PermissionService);

  constructor(){
    this.status = "success";
  }

  ngOnInit(): void {
    this.getPermissions();
  }

  public getPermissions(){
    this._permissionService.Permissions().subscribe(
      (response:any) => {
        if(response.status == this.status){
            this.permissions = response.permissions;
            console.log(this.permissions);
        }
      }
    );
  }

  public deletedPermission(id:number){
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
      if(result.isConfirmed){
        this._permissionService.deletePermission(id).subscribe(
          (response:any) => {
            if(response.status == this.status){
                this.message = response.message;
                Swal.fire({
                  title: "Eliminado!",
                  text: this.message,
                  icon: response.status
                });

                this.getPermissions();
            }
          }
        );
      }
    });
  }

}
