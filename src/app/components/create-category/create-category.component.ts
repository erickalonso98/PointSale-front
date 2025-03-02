import { Component,inject } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { FormsModule,NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ICategory } from '../../models/Category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {

  private _categoryService = inject(CategoryService);
  public title:string;
  public category:ICategory;
  public message!:string;
  public status!:string;

  constructor(){
    this.title = 'Registrar Categoria';
    this.category = {} as ICategory;
    this.status = 'success';
  }

  public onSubmit(form:NgForm):void{
    console.log(this.category);
  
    this._categoryService.createCategory(this.category).subscribe(
      (response:any) => {
        if(response.status == this.status){
          console.log(response);
          this.message = response.message;
            Swal.fire({
              title: "¡Enhorabuena!",
              text: this.message,
              icon:  response.status
            });
        }

        form.reset();
      }
    );
  }
}
