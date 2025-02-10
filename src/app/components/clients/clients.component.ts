import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListClientsComponent } from '../list-clients/list-clients.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [MenuComponent,SidebarComponent,ListClientsComponent,RouterLink,RouterLinkActive],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

}
