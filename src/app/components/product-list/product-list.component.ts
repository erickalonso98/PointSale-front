import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  public status:string;
  public message!:string;
  public products!:Array<IProduct>;
  private _productService = inject(ProductService);

  constructor(){
    this.status = '';
  }

  ngOnInit(): void {
    this.getProduct();
  }

  public getProduct():void{
    this._productService.products().subscribe(
      (response:any) => {
        this.status = 'success';
        if(response.status == this.status){
          this.products = response.products;
          console.log(this.products);
        }
      }
    );
  }

  public deleteProduct(id:number):void{
    console.log(id);
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this._productService.destroyProduct(id).subscribe(
          (response:any)=>{
            this.status = 'success';
            if(response.status == this.status){
              this.message = response.message;
                Swal.fire({
                  title: "Eliminado!",
                  text: this.message,
                  icon: response.status
                });

                this.getProduct();
            }
        });
      }
    });
  }

}
