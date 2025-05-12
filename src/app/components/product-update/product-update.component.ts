import { Component,inject,OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { RouterLink,RouterLinkActive,Router,ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProviderService } from '../../services/provider.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserService } from '../../services/user.service';
import { IProduct } from '../../models/Product';
import { ICategory } from '../../models/Category';
import { IProvider } from '../../models/Provider';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [FormsModule,SidebarComponent,RouterLink,RouterLinkActive],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent implements OnInit{

  public title:string;
  public product:IProduct;
  public category!:Array<ICategory>;
  public provider!:Array<IProvider>;

  public status:string;
  public message:string;

  private _productService = inject(ProductService);
  private _categoryService = inject(CategoryService);
  private _providerService = inject(ProviderService);

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  public statusOptions = [
    {
      id: 1,
      value: 'ACTIVE'
    },
    {
      id: 2,
      value:'INACTIVE'
    }
  ];

  constructor(){
    this.title = 'Actualizar Producto';
    this.product = {} as IProduct;
    this.status = '';
    this.message = '';
  
  }

ngOnInit(): void {
  this.getProduct();
  this.getCategories();
  this.getProviders();
}

public onStatusChange(event: any) {
  console.log('Nuevo estado:', this.product.status);
}

public onSubmit(form:NgForm):void{
  this._productService.updateProduct(this.product,this.product.id).subscribe(
    (response:any) => {
      this.status = 'success';
      if(response.status == this.status){
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

public getProduct():void{
  this._route.params.subscribe((params) => {
    var id = params['id'];
    console.log(id);
    this._productService.product(id).subscribe((response:any) =>{
      this.status = 'success';
      if(response.status == this.status){
          this.product = response.product;
          console.log(this.product);
          
      }else{
        this._router.navigate(['/products']);
      }
    });
  });
}

public getCategories():void{
  this._categoryService.categories().subscribe(
    (response:any) => {
      this.status = 'success';
      if(response.status == this.status){
        this.category = response.categories;
        console.log(this.category);
      }else{
        this.status = 'error';
      }
    }
  );
}

public getProviders():void{
  this._providerService.Providers().subscribe(
    (response:any) => {
      this.status = 'success';
      if(response.status == this.status){
        this.provider = response.providers;
        console.log(this.provider);
      }else{
        this.status = 'error';
      }
    }
  );
}

}
