import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

/**
 * Floating settings menu shared component.
 */
@Component({
  selector: 'app-floating-settings-menu',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './floating-settings-menu.component.html',
  styleUrl: './floating-settings-menu.component.scss'
})
export class FloatingSettingsMenuComponent {
  /** Emit event when editing object */
  @Output() edit: EventEmitter<null> = new EventEmitter();
  /** Emit event when deleting object */
  @Output() delete: EventEmitter<null> = new EventEmitter();
}
