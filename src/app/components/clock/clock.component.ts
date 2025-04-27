import { Component,OnInit } from '@angular/core';
import moment from 'moment';
import 'moment/locale/es'; 

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.css'
})
export class ClockComponent implements OnInit{

  ngOnInit(): void {
    moment.locale('es');
    var clockview = document.querySelector('#clock') as HTMLDivElement;
    setInterval(() => {
      var clock = moment().format('MMMM Do YYYY,hh:mm:ss a');
      clockview.innerHTML = clock;
    },1000);
  }

}
