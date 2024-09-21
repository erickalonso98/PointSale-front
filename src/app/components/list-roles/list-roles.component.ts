import { Component, inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { IRole } from '../../models/Role';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-roles',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './list-roles.component.html',
  styleUrl: './list-roles.component.css'
})
export class ListRolesComponent implements OnInit {
    private _roleService = inject(RolesService);
    public roles!:Array<IRole>;
    public status!:string;
    public message!:string;

    constructor(){
      this.status = "success";
    }

    ngOnInit(): void {
      this.getRoles();
    }

    public getRoles(){
      this._roleService.Roles().subscribe(
        (response:any) => {
          if(response.status == this.status){
            this.roles = response.roles;
            this.message = response.message;
            console.log(this.roles);
          }
        }
      );
    }

    public deleteRole(id:number){
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
            this._roleService.deleteRole(id).subscribe(
              (response:any) => {
                if(response.status == this.status){
                  Swal.fire({
                    title: "Eliminado!",
                    text: response.message,
                    icon: response.status
                  });
                }

                this.getRoles();
              }
            );
          }
      });
    }
}
