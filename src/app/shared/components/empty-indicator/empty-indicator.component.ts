import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

/**
 * Empty indicator shared component.
 */
@Component({
  selector: 'app-empty-indicator',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './empty-indicator.component.html',
  styleUrl: './empty-indicator.component.scss'
})
export class EmptyIndicatorComponent {
  @Input() elementName!: string;
}
