import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListRolesComponent } from '../list-roles/list-roles.component';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [MenuComponent,SidebarComponent,ListRolesComponent,RouterLink,RouterLinkActive],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

}
