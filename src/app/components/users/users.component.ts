import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListUsersComponent } from '../list-users/list-users.component';
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MenuComponent,SidebarComponent,ListUsersComponent,RouterLink,RouterLinkActive],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
