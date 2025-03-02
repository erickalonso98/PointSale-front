import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListProviderComponent } from '../list-provider/list-provider.component';
@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [MenuComponent,SidebarComponent,ListProviderComponent,RouterLink,RouterLinkActive],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css'
})
export class ProviderComponent {

}
