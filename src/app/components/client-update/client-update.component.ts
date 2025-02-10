import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive,Router,ActivatedRoute } from '@angular/router';
import { NgForm,FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/Client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-update',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule,SidebarComponent],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent implements OnInit{

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _clientService = inject(ClientService);
  public client:IClient;

  public message:string;
  public status:string;

  constructor() {
    this.client = {} as IClient;
    this.message = '';
    this.status = 'success';
  }

  ngOnInit(): void {
    this.getClient();
  }

  public onSubmit(form:NgForm):void{
    
      console.log(this.client);

      Swal.fire({
        title: "¿Quieres guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        denyButtonText: `no guardar`,
        cancelButtonText: 'Cancelar'
      }).then((result) => {
          if(result.isConfirmed){
            this._clientService.updateClient(this.client,this.client.id).subscribe(
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

                this._router.navigate(["/clients"]);
              }
            );
          }else if (result.isDenied){
            Swal.fire("Los cambios no se actualizaron", "", "info");
          }
      });      
  }

    public getClient():void{
      this._route.params.subscribe((params) => {
          let id = +params['id'];
          this._clientService.Client(id).subscribe(
            (response:any)=> {
              if(response.status ==  this.status){
                  console.log(response);
                  this.client = response.client;
                  console.log(this.client);
              }else{
                this._router.navigate(['/clients']);
              }
            }
          );
      });
    }
}
