import { Component,inject,OnInit } from '@angular/core';
import { RouterLink,RouterLinkActive,Router,ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../models/Client';


@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, SidebarComponent],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent implements OnInit {

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _clientService = inject(ClientService);
  public client:IClient;

  public message:string;
  public status:string;

  public title:string;

  constructor(){
    this.client = {} as IClient;
    this.message = '';
    this.status = 'success';
    this.title = 'Detalle del Cliente';
  }

  ngOnInit(): void {
    this.getClient();
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
