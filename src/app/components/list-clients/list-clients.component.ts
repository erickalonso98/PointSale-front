import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/Client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css'
})
export class ListClientsComponent implements OnInit {

  private _clientService = inject(ClientService);
  public clients!:Array<IClient>;
  public status:string;
  public message!:string;

  constructor(){
    this.clients = [];
    this.status = "success";
  }

  ngOnInit(): void {
    this.getClients();
  }

  public getClients(){
    this._clientService.Clients().subscribe(
      (response:any) => {
        if(response.status == this.status){
          this.clients = response.clients;
          console.log(this.clients);
        }
      }
    );
  }

  public deletedClient(id:number){
    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if(result.isConfirmed){
          this._clientService.deleteClient(id).subscribe(
            (response:any) => {
              if(response.status == this.status){
                this.message = response.message;
                Swal.fire({
                  title: "Eliminado!",
                  text: this.message,
                  icon: response.status
                });

                this.getClients();
              }
            }
          );
        }
    })
  }
}
