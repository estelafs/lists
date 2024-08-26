import { Component } from '@angular/core';
import { ListsComponent } from '../../../features/lists/lists.component';
import { CardModule } from 'primeng/card';

/**
 * Home component.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListsComponent, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
