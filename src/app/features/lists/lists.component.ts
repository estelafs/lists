import { Component } from '@angular/core';
import { CdkDropList, CdkDrag, moveItemInArray, CdkDragDrop, CdkDragHandle } from '@angular/cdk/drag-drop';
import { List } from '../../shared/models/list.model';
import { ListService } from './services/list.service';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { FloatingSettingsMenuComponent } from '../../shared/components/floating-settings-menu/floating-settings-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { ManageListModalComponent } from './components/manage-list-modal/manage-list-modal.component';
import { MatButtonModule } from '@angular/material/button';

/**
 * Lists component.
 */
@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MatIconModule,
    FloatingSettingsMenuComponent,
    MatButtonModule,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class ListsComponent {
  /** Collection of available lists */
  public lists: List[] = [];

  constructor(
    private listService: ListService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.listService.loadLists();

    this.listService.lists.subscribe((value: List[] | null) => {
      if(value) {
        this.lists = value;
      }
    });
  }

  /**
   * On click on list, redirect to list page 
   *
   * @param list selected list
   */
  public onOpenList(list: List): void {
    this.router.navigateByUrl('/list' + `/${list.id}`);
  }

  public onReorderList(event: CdkDragDrop<List[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }

  /**
   * Handle click in the edit list settings option opening edit list modal
   *
   * @param list list to be edited
   */
  public onEditList(list: List): void {
    const dialogRef = this.dialog.open(ManageListModalComponent, {
      data: { list },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listService.updateList({ ...result, id: list.id });
      }
    });
  }

  /**
   * Handle click in the edit list settings option opening edit list modal
   */
  public createList(): void {
    const dialogRef = this.dialog.open(ManageListModalComponent, {
      data: { order: this.lists.length + 1 },
    });

    dialogRef.afterClosed().subscribe(result => {
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
    console.log('onDeleteList list: ', list);
  }
}
