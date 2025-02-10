import { Component,inject,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router,ActivatedRoute } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { IPermission } from '../../models/Permission';

@Component({
  selector: 'app-permission-detail',
  standalone: true,
  imports: [SidebarComponent,RouterLink, RouterLinkActive],
  templateUrl: './permission-detail.component.html',
  styleUrl: './permission-detail.component.css'
})
export class PermissionDetailComponent implements OnInit{

  private _permissionService = inject(PermissionService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  public permission:IPermission;
  public message:string
  public status!:string;

  public title:string;

  constructor(){
    this.permission = {} as IPermission;
    this.message = "";
    this.status = 'success';
    this.title = 'Detalle del permiso';
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
}
