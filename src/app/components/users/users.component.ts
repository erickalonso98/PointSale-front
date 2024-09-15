import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListUsersComponent } from '../list-users/list-users.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MenuComponent,SidebarComponent,ListUsersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
