import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FloatingSettingsMenuComponent } from '../../shared/components/floating-settings-menu/floating-settings-menu.component';
import { Item, MeasuringUnits } from '../../shared/models/item.model';
import { ItemService } from '../../shared/services/item.service';
import { ManageItemModalComponent } from './components/manage-item-modal/manage-item-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategoryComponent } from '../categories/category.component';
import { UnsubscribeComponent } from '../../shared/components/unsubscribe/unsubscribe.component';
import { takeUntil } from 'rxjs';

/**
 * Item component.
 */
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    FloatingSettingsMenuComponent,
    ConfirmDialogModule,
    CategoryComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent extends UnsubscribeComponent {
  /** Item input */
  @Input() item!: Item;
  /** Measuring units enums */
  public measuringUnits = MeasuringUnits;

  constructor(
    private itemService: ItemService,
    private dialog: MatDialog,
    private confirmationService: ConfirmationService
  ){
    super();
  }

  /**
   * Handle click in item checkbox to check / uncheck it 
   *
   * @param item item checked / unchecked
   * @param checked if item was checked (true) or unchecked (false)
   */
  public onCheckItem(item: Item, checked: boolean): void {
    item.checked = checked;
    this.itemService.updateCheckItem(item);
  }

  /**
   * Handle click in the edit item settings option 
   *
   * @param item item to be edited
   */
  public onEditItem(item: Item): void {
    const dialogRef = this.dialog.open(ManageItemModalComponent, {
      data: {
        item: this.item,
        listId: this.item?.list?.id
      },
      minWidth: 500
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.itemService.updateItem({ ...result, id: item.id, checked: item.checked });
        }
      });
  }

  /**
   * Handle click in the delete item settings option 
   *
   * @param item item to be deleted
   */
  public onDeleteItem(item: Item): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete the item '${item.name}'?`,
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      key: 'confirmDelete',
      accept: () => {
        this.itemService.deleteItem(item);
      }
    });
  }
}
