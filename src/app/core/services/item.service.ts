/* eslint-disable @typescript-eslint/no-explicit-any */
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
  get items$(): Observable<Item[]> {
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
    const items = (await this.restService.get(
      this.url + `?listId=${id}&_expand=category&_expand=list&_sort=checked`
    ) ?? []) as Item[];
    this.items.next(items);
  }

  /**
   * Update item check property.
   *
   * @param item item updated to save
   */
  public async updateCheckItem(item: Item): Promise<void> {
    delete item.list;
    delete item.category;
    this.updateItem(item);
  }

  /**
   * Delete item.
   *
   * @param item item selected to delete
   */
  public async deleteItem(item: Item): Promise<void> {
    await this.restService.delete(this.url + `/${item.id}`);
    this.loadItemsByListId((item as any).listId);
  }

  /**
   * Create a new item object.
   *
   * @param item item object to create
   */
  public async createItem(item: Item): Promise<void> {
    const itemCreated = await this.restService.post(this.url, JSON.stringify(item));
    if (itemCreated) {
      this.loadItemsByListId((itemCreated as any).listId);
    }
  }

  /**
   * Update item object.
   *
   * @param item item updated to save
   */
  public async updateItem(item: Item): Promise<void> {
    await this.restService.put(this.url + `/${item.id}`, JSON.stringify(item));
    this.loadItemsByListId((item as any).listId);
  }
}
