import { Component,OnInit, ViewChild, ElementRef, AfterViewInit,inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chart, ChartConfiguration, ChartType,registerables } from 'chart.js';
import { CategoryService } from '../../services/category.service';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ICategory } from '../../models/Category';
import { ClockComponent } from '../clock/clock.component';

Chart.register(...registerables); 

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterLinkActive,RouterLink,MenuComponent,SidebarComponent,ClockComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit{

  public title!:string;
  public total:number;
  public status:string;
  private _categoryService = inject(CategoryService);
  
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  constructor(){
    /*
    this.title = "Bienvenido";
    Swal.fire({
      title:this.title
    });*/

    this.total = 0;
    this.status = '';

  }

  ngOnInit(): void {
    //this.loadGraph();
    this.getCountCategory();
  }

  ngAfterViewInit(){
    this.loadGraph();
  }

  public loadGraph() {
    this.chart = new Chart(this.canvas.nativeElement,{
      type: 'bar', // Tipo de gráfico (bar, line, pie, etc.)
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'Ventas',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  public getCountCategory():void{
    this._categoryService.countCategory().subscribe(
      (response:any) => {
        this.status = 'success';
        if(response.status == this.status){
          console.log(response);
          this.total = response.total;
          console.log(this.total);
        }
      }
    );
  }

}
