import { Component } from '@angular/core';
import { List } from '../../shared/models/list.model';
import { ListService } from './services/list.service';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { FloatingSettingsMenuComponent } from '../../shared/components/floating-settings-menu/floating-settings-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageListModalComponent } from './components/manage-list-modal/manage-list-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { EmptyIndicatorComponent } from '../../shared/components/empty-indicator/empty-indicator.component';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { UnsubscribeComponent } from '../../shared/components/unsubscribe/unsubscribe.component';

/**
 * Lists component.
 */
@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    FloatingSettingsMenuComponent,
    MatButtonModule,
    EmptyIndicatorComponent,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class ListsComponent extends UnsubscribeComponent {
  constructor(
    public listService: ListService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private dialog: MatDialog
  ) {
    super();
    this.listService.loadLists();
  }

  /**
   * On click on list, redirect to list page 
   *
   * @param list selected list
   */
  public onOpenList(list: List): void {
    this.router.navigateByUrl('/list' + `/${list.id}`);
  }

  /**
   * Handle click in the edit list settings option opening edit list modal
   *
   * @param list list to be edited
   */
  public onEditList(list: List): void {
    const dialogRef = this.dialog.open(ManageListModalComponent, {
      data: { list },
      minWidth: 500
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.listService.updateList({ ...result, id: list.id });
        }
      });
  }

  /**
   * Handle click create new list opening modal
   */
  public createList(): void {
    const dialogRef = this.dialog.open(ManageListModalComponent, {
      data: { order: this.listService.lists.getValue().length + 1 },
      minWidth: 500
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.listService.createList(result);
        }
      });
  }

  /**
   * Handle click in the delete list settings option 
   *
   * @param list list to be deleted
   */
  public onDeleteList(list: List): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete the list '${list.name}'?`,
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      key: 'confirmDelete',
      accept: () => {
        this.listService.deleteList(list);
      }
    });
  }
}
