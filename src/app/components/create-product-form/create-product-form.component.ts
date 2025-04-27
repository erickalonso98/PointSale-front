import { Component,inject,OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProviderService } from '../../services/provider.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserService } from '../../services/user.service';
import { IProduct } from '../../models/Product';
import { ICategory } from '../../models/Category';
import { IProvider } from '../../models/Provider';
import { global } from '../../services/global';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-product-form',
  standalone: true,
  imports: [FormsModule,SidebarComponent],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.css'
})
export class CreateProductFormComponent implements OnInit{

  public title:string;
  public product:IProduct;
  public category!:Array<ICategory>;
  public provider!:Array<IProvider>;

  public status:string;
  public message:string;

  private _productService = inject(ProductService);
  private _categoryService = inject(CategoryService);
  private _providerService = inject(ProviderService);
  private _userServicce = inject(UserService);

  public photo:string | any;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg,.png,.gif",
    maxSize: "1",
    uploadAPI:  {
      url:`${global.url}/product/upload/`,
      method:"POST",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8",
     "Authorization" : `Bearer ${this._userServicce.getToken()}`
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
      withCredentials: false,
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    //hideSelectBtn: true,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};

  constructor(){
    this.title = 'Registrar Producto';
    this.product = {} as IProduct;
    this.status = '';
    this.message = '';
  
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProviders();
  }

  public onSubmit(form:NgForm):void{
    this._productService.createProduct(this.product).subscribe(
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

  public imageUpload(event:Event):void{
    var file0 = event.target as HTMLInputElement
    var files:File | any  = file0.files;

    this.photo = files[0];
    this.product.photo = this.photo;
   
    var formData:FormData = new FormData();
    formData.append('file0',String(this.product.photo));

  }

}
