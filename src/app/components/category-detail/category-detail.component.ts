import { Component,inject,OnInit } from '@angular/core';
import { Router,ActivatedRoute,RouterLink,RouterLinkActive } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ICategory } from '../../models/Category';
@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [SidebarComponent,RouterLink,RouterLinkActive],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent implements OnInit {

  public title:string;
  public status:string;
  public category:ICategory;

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _categoryService = inject(CategoryService);

  constructor(){
    this.title = 'Detalle de la categoria';
    this.status = '';
    this.category = {} as ICategory;
  }

  ngOnInit(): void {
    this.getCategory();
  }

public getCategory():void{
  this._route.params.subscribe((params) => {
      let id = +params['id'];
      this._categoryService.category(id).subscribe(
        (response:any) => {
          this.status = 'success';
          if(response.status == this.status){
            this.category = response.categories;
            console.log(this.category);
          }else{
            this.status = 'error';
            this._router.navigate(['/categories']);
          }
        }
      );
  });
}

}
