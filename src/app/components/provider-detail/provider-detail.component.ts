import { Component,inject,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProviderService } from '../../services/provider.service';
import { IProvider } from '../../models/Provider';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [SidebarComponent,RouterLink,RouterLinkActive],
  templateUrl: './provider-detail.component.html',
  styleUrl: './provider-detail.component.css'
})
export class ProviderDetailComponent implements OnInit {

  public title:string;
  public provider:IProvider;
  public status:string;
  private _providerService = inject(ProviderService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  constructor(){
    this.title = 'Detalle del proveedor';
    this.status = '';
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

}
