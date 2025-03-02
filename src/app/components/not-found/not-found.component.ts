import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  public title:string;
  public code:number;
  public message:string;

  constructor(){
    this.title = 'página no encontrada';
    this.message = 'El recurso solicitado no se pudo encontrar en este servidor.';
    this.code = 404;
  }
}
