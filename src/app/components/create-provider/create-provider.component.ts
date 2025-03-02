import { Component,inject } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { FormsModule,NgForm } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { IProvider } from '../../models/Provider';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-provider',
  standalone: true,
  imports: [FormsModule,SidebarComponent],
  templateUrl: './create-provider.component.html',
  styleUrl: './create-provider.component.css'
})
export class CreateProviderComponent {

  public title:string;
  public provider:IProvider;
  public status:string;
  public message!:string;
  private _providerService = inject(ProviderService);

  constructor(){
    this.title = 'Registrar Proveedor';
    this.provider = {} as IProvider;
    this.status = "success";
  }

  public onSubmit(form:NgForm):void{
      console.log(this.provider);

      this._providerService.createProvider(this.provider).subscribe(
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
