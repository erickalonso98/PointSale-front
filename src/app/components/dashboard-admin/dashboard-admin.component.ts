import { Component,OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Chart, ChartConfiguration, ChartType,registerables } from 'chart.js';
import { MenuComponent } from '../menu/menu.component';
import { SidebarComponent } from '../sidebar/sidebar.component';


Chart.register(...registerables); 

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterLinkActive,RouterLink,MenuComponent,SidebarComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent implements OnInit{

  public title!:string;
  
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  public chart!: Chart;
  constructor(){
    /*
    this.title = "Bienvenido";
    Swal.fire({
      title:this.title
    });*/
  }

  ngOnInit(): void {
    //this.loadGraph();
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

}
