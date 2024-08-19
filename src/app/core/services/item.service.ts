import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Item } from '../../shared/models/item.model';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service to manage items
 */
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  /** Collection of items of the list opened */
  public items = new BehaviorSubject<Item[]>([]);
  /** @returns Items from the current opened list as observable */
  get items$(): Observable<Item[] | null> {
    return this.items.asObservable();
  }

  /** Fake REST API url to item collection */
  private url = 'http://localhost:3000/items';

  constructor(private restService: RestService) {}

  /**
   * Gets the items of the a list from the database, by the list id
   *
   * @param id list id
   */
  public async loadItemsByListId(id: number): Promise<void> {
    const items = (await this.restService.get(this.url + `?list=${id}&_expand=category&_expand=list`) ?? []) as Item[];
    this.items.next(items);
  }

  /**
   * Update item object.
   *
   * @param item item updated to save
   */
  public async updateItem(item: Item): Promise<void> {
    const id = item.id;
    delete item.id;
    delete item.list;
    delete item.category;
    await this.restService.put(this.url + `/${id}`, JSON.stringify(item));
  }
}
