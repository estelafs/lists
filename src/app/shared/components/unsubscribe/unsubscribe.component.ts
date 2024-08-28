import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Shared unsubscribe component to remove subscription to subjects.
 * Can be extended by any component, that would use ngOnDestroy to do so.
 */
@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [],
  templateUrl: './unsubscribe.component.html',
  styleUrl: './unsubscribe.component.scss'
})
export class UnsubscribeComponent implements OnDestroy {
  /** Subject to destroy  */
  destroy$: Subject<boolean> = new Subject<boolean>();

  /** Emit Destroy event, and unsubscribe to destroy */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
