import { Component,inject,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router,ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/Product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [SidebarComponent,RouterLink, RouterLinkActive],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

  public product!:IProduct;
  private _productService = inject(ProductService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  public status!:string;
  public title:string;

  constructor(){
    this.title = 'Detalle del producto';
  }

  ngOnInit(): void {
    this.getProduct();
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

}
