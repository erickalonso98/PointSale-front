import { Component,inject,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { ICompany } from '../../models/Company';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [SidebarComponent,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent implements OnInit {

  private _companyService = inject(CompanyService);
  public company!:ICompany;
  public id!:number;

  constructor(){
    this.company = {
      id: 0,
      name: '',
      email: '',
      adreess: ''
    };
  }

  ngOnInit(): void {
    this.getCompanys();
  }

  public getCompanys():void{
    this._companyService.Companies().subscribe(
      (response:any) => {
        this.company = response.companies['0'];
      }
    );
}

  public onSubmit(form:NgForm):void{
    console.log(this.company);

            Swal.fire({
              title: "¿Quieres guardar los cambios?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Actualizar",
              denyButtonText: `no guardar`,
              cancelButtonText: 'Cancelar'
            }).then((result) => {
              if(result.isConfirmed){
                this._companyService.modifyCompany(this.company.id,this.company).subscribe(
                  (response:any) => {
                    if(response.status == 'success'){
                      Swal.fire({
                        title: "¡Enhorabuena!",
                        text: response.message,
                        icon: response.status
                      });
                    }
                  },
                  (error) => {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: error.error.message,
                    });
                  }
                );
              }else if (result.isDenied){
                Swal.fire("Los cambios no se actualizaron", "", "info");
              }
          });      
  }

}
