import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListPermissionsComponent } from '../list-permissions/list-permissions.component';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [MenuComponent,SidebarComponent,ListPermissionsComponent,RouterLink,RouterLinkActive],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent {

}
