import { Component,inject } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { FormsModule,NgForm } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { IClient } from '../../models/Client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [SidebarComponent,RouterLink,RouterLinkActive,FormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {

  private _clientService = inject(ClientService);
  public title!:string;
  public client:IClient;
  public message!:string;
  public status:string;

    constructor(){
      this.client = {} as IClient;
      this.title = "Registrar Cliente";
      this.status = 'success';
    }

    public onSubmit(form:NgForm):void{
      this._clientService.createClient(this.client).subscribe(
        (response:any)=>{
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
