import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/Category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit{

  public categories!:Array<ICategory>
  public status:string;
  public message!:string;
  private _categoryService = inject(CategoryService);

  constructor(){
    this.status = 'success';
  }

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories():void{
    this._categoryService.categories().subscribe(
      (response:any) => {
        if(response.status ==  this.status){
            console.log(response);
            this.categories = response.categories;
            console.log(this.categories); 
        }
      },
      (error:any) => {
        this.status = 'error';
        console.log(error);

        if(error.error.status == this.status){
          this.message = error.error.message;
          console.log(this.message);
        }

      }
    );
  }

public deleteCategory(id:number):void{
  Swal.fire({
    title: "Estas seguro?",
    text: "No podrás revertir esto.!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borralo!",
    cancelButtonText: 'Cancelar'
  }).then((result)=> {
    if(result.isConfirmed){
      this._categoryService.destroyCategory(id).subscribe(
        (response:any) => {
          if(response.status == this.status){
            this.status = 'success';
            this.message = response.message;
            Swal.fire({
              title: "Eliminado!",
              text: this.message,
              icon: response.status
            });
          }

          this.getCategories();
        }
      );
    }
  });
}

}
