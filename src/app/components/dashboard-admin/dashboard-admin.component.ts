import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterLinkActive,RouterLink,MenuComponent,SidebarComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

  public title:string;
  constructor(){
    this.title = "Bienvenido";
    Swal.fire({
      title:this.title
    });
  }
}
