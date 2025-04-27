import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SidebarComponent,RouterLink,RouterLinkActive,ProductListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
