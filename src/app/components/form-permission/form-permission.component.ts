import { Component,inject } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PermissionService } from '../../services/permission.service';
import { IPermission } from '../../models/Permission';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-permission',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './form-permission.component.html',
  styleUrl: './form-permission.component.css'
})
export class FormPermissionComponent {

  private _permissionService = inject(PermissionService);
  public permission:IPermission;
  public message:string
  public status!:string;


  constructor(){
    this.permission = {} as IPermission;
    this.message = "";
    this.status = 'success';
  }

  public onSubmit(form:NgForm):void{
    this._permissionService.createPermission(this.permission).subscribe(
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
