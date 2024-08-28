import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ItemService } from '../../../../shared/services/item.service';
import { CardModule } from 'primeng/card';
import { ItemComponent } from '../../../item/item.component';
import { MatButtonModule } from '@angular/material/button';
import { EmptyIndicatorComponent } from '../../../../shared/components/empty-indicator/empty-indicator.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageItemModalComponent } from '../../../item/components/manage-item-modal/manage-item-modal.component';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { UnsubscribeComponent } from '../../../../shared/components/unsubscribe/unsubscribe.component';

/**
 * List component.
 */
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CardModule,
    ItemComponent,
    MatButtonModule,
    EmptyIndicatorComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent
  extends UnsubscribeComponent
  implements OnInit
{
  /** Loading indicator */
  public loading = true;

  constructor(
    public listService: ListService,
    private route: ActivatedRoute,
    public itemService: ItemService,
    private dialog: MatDialog
  ){
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (params) => {
        this.loading = true;
        await this.listService.loadListById(params['id']);
        await this.itemService.loadItemsByListId(params['id']);
        this.loading = false;
      });
  }

  /**
   * Handle click create new item opening modal
   */
  public createItem(): void {
    const dialogRef = this.dialog.open(ManageItemModalComponent, {
      data: { listId: this.listService.list.getValue()?.id },
      minWidth: 500
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.itemService.createItem(result);
        }
      });
  }
}
