import { Component,inject,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RolesService } from '../../services/roles.service';
import { IRole } from '../../models/Role';

@Component({
  selector: 'app-role-detail',
  standalone: true,
  imports: [SidebarComponent, RouterLink, RouterLinkActive],
  templateUrl: './role-detail.component.html',
  styleUrl: './role-detail.component.css'
})
export class RoleDetailComponent implements OnInit {

  public title:string;
  private _roleService = inject(RolesService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  public role:IRole;
  public status:string;

  constructor(){
    this.title = 'Detalle del rol de usuario';
    this.role = {} as IRole;
    this.status = "success";
  }

  ngOnInit(): void {
    this.getRole();
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
            this._router.navigate(["/roles"]);
          }
        }
      );
    });
  }

}
