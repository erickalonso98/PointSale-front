import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { IProvider } from '../../models/Provider';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-provider',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './list-provider.component.html',
  styleUrl: './list-provider.component.css'
})
export class ListProviderComponent implements OnInit{

  public status:string;
  public providers!:IProvider[];
  public message!:string;
  private _providerService = inject(ProviderService);

  constructor(){
    this.status = "success";
    
  }

  ngOnInit(): void {
    this.getProviders();
  }

public getProviders():void{
  this._providerService.Providers().subscribe(
    (response:any) => {
      if(response.status == this.status){
        this.providers = response.providers;
        console.log(this.providers);
      }
    },
    (error:any) => {
      this.status = "error";
      if(error.error.status == this.status){
        this.message = error.error.message;
        console.log(this.message);
      }
    }
  );
}

public deleteProvider(id:number):void{
  Swal.fire({
    title: "Estas seguro?",
    text: "No podrás revertir esto.!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borralo!",
    cancelButtonText: 'Cancelar'
  }).then((result)=> {
      if(result.isConfirmed){
        this._providerService.destroyProvider(id).subscribe(
          (response:any) => {
              if(response.status == this.status){
                this.message = response.message;
                Swal.fire({
                  title: "Eliminado!",
                  text: this.message,
                  icon: response.status
                });

                this.getProviders();
            }
          }
        );
      }
  });
}  
  
}
