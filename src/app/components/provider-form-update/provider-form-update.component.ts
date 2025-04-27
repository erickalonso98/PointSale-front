import { Component,inject,OnInit } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProviderService } from '../../services/provider.service';
import { IProvider } from '../../models/Provider';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider-form-update',
  standalone: true,
  imports: [SidebarComponent,RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './provider-form-update.component.html',
  styleUrl: './provider-form-update.component.css'
})
export class ProviderFormUpdateComponent implements OnInit {

  public title:string;
  public provider:IProvider;
  public status:string;
  public message:string;
  private _providerService = inject(ProviderService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  constructor(){
    this.title = 'Actualizar del proveedor';
    this.status = '';
    this.message = '';
    this.provider = {} as IProvider;
  }

  ngOnInit(): void {
    this.getProvider();
  }

  public getProvider():void{
    this._route.params.subscribe((params)=> {
      let id = +params['id'];
      this._providerService.Provider(id).subscribe(
        (response:any) => {
          this.status = 'success';
          if(response.status == this.status){
            this.provider = response.provider;
            console.log(this.provider);
          }else{
            this.status = 'error';
            this._router.navigate(['/providers']);
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
    }).then((result)=> {
        if(result.isConfirmed){
          this._providerService.updateProvider(this.provider,this.provider.id).subscribe(
            (response:any) => {
              this.status = 'success';
              if(response.status == this.status){
                this.message = response.message;
                Swal.fire({
                  title: "¡Enhorabuena!",
                  text: this.message,
                  icon:  response.status
                });
      
                this._router.navigate(['/providers']);
      
              }
            }
          );
        }else if (result.isDenied){
          Swal.fire("Los cambios no se actualizaron", "", "info");
        }
    });
  }

}
