import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { ExportAsConfig, ExportAsModule, ExportAsService } from 'ngx-export-as';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; 
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,ExportAsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  public status:string;
  public message!:string;
  public products!:Array<IProduct>;
  private _productService = inject(ProductService);
  private _exportAsService = inject(ExportAsService);

  public currentPage:number;
  public totalPage:number;

  constructor(){
    this.status = '';
    this.currentPage = 1;
    this.totalPage = 1;
    //PdfMakeWrapper.setFonts((fonts as any).pdfMake.vfs);  
  }

  ngOnInit(): void {
    this.getProduct();
  }

  public getProduct(page:number = 1):void{
    this._productService.products(page).subscribe(
      (response:any) => {
        this.status = 'success';
        if(response.status == this.status){
          this.products = response.products.data;
          this.currentPage = response.current_page;
          this.totalPage = response.last_page;
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

  public nextPage():void{
    if(this.currentPage < this.totalPage){
      this.getProduct(this.currentPage + 1)
    }
  }

  public prevPage():void{
    if(this.totalPage > 1){
      this.getProduct(this.currentPage - 1);
    }
  }

  public generatePdf():void{
    const pdf = new PdfMakeWrapper();
    pdf.add(new Txt('Productos').bold().fontSize(16).margin([0,0,0,10]).end);

    const tableBody = [
         ['#','Codigo','Nombre','Precio de Compra','Precio de Venta','Stock','Stock minimo','Estado'],
      ...this.products.map(product => [product.id,product.code,product.name,product.purchase_price,product.sale_price,product.stock,product.minimum_stock,product.status])
    ];

    pdf.add(
      new Table(tableBody).layout('lightHorizontalLines').end
    );

    pdf.create().open();

  }

  public exportProductExcel():void{
    const config: ExportAsConfig = {
      type: 'xlsx',
      elementIdOrContent:'table-product'
    }

    this._exportAsService.save(config,'productos').subscribe(()=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡EnHorabuena!",
          text:'Productos exportado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
    });

  }

}
