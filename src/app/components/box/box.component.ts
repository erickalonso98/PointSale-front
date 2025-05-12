import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-box',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {

}
