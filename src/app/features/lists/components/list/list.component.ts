import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { List } from '../../../../shared/models/list.model';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ItemService } from '../../../../core/services/item.service';
import { Item } from '../../../../shared/models/item.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FloatingSettingsMenuComponent } from '../../../../shared/components/floating-settings-menu/floating-settings-menu.component';

/**
 * List component.
 */
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCheckboxModule,
    FloatingSettingsMenuComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  /** Loading indicator */
  public loading = true;
  /** List object */
  public list!: List | null;
  /** Items from the current opened list object */
  public listItems: Item[] = [];

  constructor(public listService: ListService, private route: ActivatedRoute, private itemService: ItemService){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.listService.loadListById(params['id']);
      this.itemService.loadItemsByListId(params['id']);
    });

    this.listService.list.subscribe((value: List | null) => {
      if(value) {
        this.list = value;
        this.loading = false;
      }
    });

    this.itemService.items.subscribe((value: Item[]) => {
      this.listItems = value;
    });
  }

  /**
   * Handle click in item checkbox to check / uncheck it 
   *
   * @param item item checked / unchecked
   * @param checked if item was checked (true) or unchecked (false)
   */
  public onCheckItem(item: Item, checked: boolean): void {
    item.checked = checked;
    this.itemService.updateItem(item);
  }

  /**
   * Handle click in the edit item settings option 
   *
   * @param item item to be edited
   */
  public onEditItem(item: Item): void {
    console.log('onEditItem item: ', item);
  }

  /**
   * Handle click in the delete item settings option 
   *
   * @param item item to be deleted
   */
  public onDeleteItem(item: Item): void {
    console.log('onDeleteItem item: ', item);
  }
}
