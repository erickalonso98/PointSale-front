import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListCategoryComponent } from '../list-category/list-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [SidebarComponent,ListCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
