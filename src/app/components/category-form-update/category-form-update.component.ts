import { Component,inject,OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router,ActivatedRoute,RouterLink,RouterLinkActive } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ICategory } from '../../models/Category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-form-update',
  standalone: true,
  imports: [SidebarComponent,FormsModule],
  templateUrl: './category-form-update.component.html',
  styleUrl: './category-form-update.component.css'
})
export class CategoryFormUpdateComponent  implements OnInit {

  public title:string;
  public status:string;
  public message:string;
  public category:ICategory;

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _categoryService = inject(CategoryService);

  constructor(){
    this.title = 'Detalle de la categoria';
    this.status = '';
    this.message = '';
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

  public onSubmit(form:NgForm):void{
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      denyButtonText: `no guardar`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this._categoryService.updateCategory(this.category,this.category.id).subscribe(
          (response:any) => {
            this.status = 'success';
            if(response.status == this.status){
              this.message = response.message;
                Swal.fire({
                  title: "¡Enhorabuena!",
                  text: this.message,
                  icon:  response.status
                });

                this._router.navigate(["/categories"]);
            }
          }
        );
      }else if (result.isDenied){
        Swal.fire("Los cambios no se actualizaron", "", "info");
      }
    });
  }

}
