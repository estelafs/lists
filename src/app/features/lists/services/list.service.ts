import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from '../../../shared/models/list.model';
import { RestService } from '../../../core/services/rest.service';

/**
 * Service to manage lists
 */
@Injectable({
  providedIn: 'root'
})
export class ListService {
  /** Current opened list */
  public list = new BehaviorSubject<List | null>(null);
  /** Collection of all available lists */
  public lists = new BehaviorSubject<List[]>([]);

  /** Fake REST API url to list collection */
  private url = 'http://localhost:3000/lists';

  /** @returns Current list as observable */
  get list$(): Observable<List | null> {
    return this.list.asObservable();
  }

  /** @returns Current lists as observable */
  get lists$(): Observable<List[]> {
    return this.lists.asObservable();
  }

  constructor(private restService: RestService) {}

  /**
   * Gets the complete list collection from the database sorted by order
   *
   * @returns collection of lists
   */
  public async loadLists(): Promise<void> {
    const lists = (await this.restService.get(this.url + '?_sort=order') ?? []) as List[];
    this.lists.next(lists);
  }

  /**
   * Gets the list from the database, by its id
   *
   * @param id list id
   */
  public async loadListById(id: number): Promise<void> {
    const list = (await this.restService.get(this.url + `/${id}`) as List) ?? null;
    this.list.next(list);
  }

  /**
   * Update list object.
   *
   * @param list list updated to save
   */
  public async updateList(list: List): Promise<void> {
    await this.restService.put(this.url + `/${list.id}`, JSON.stringify(list));
    this.loadLists();
  }

  /**
   * Create a new list object.
   *
   * @param list list object to create
   */
  public async createList(list: List): Promise<void> {
    await this.restService.post(this.url, JSON.stringify(list));
    this.loadLists();
  }

  /**
   * Delete list.
   *
   * @param list list selected to delete
   */
  public async deleteList(list: List): Promise<void> {
    await this.restService.delete(this.url + `/${list.id}`);
    this.loadLists();
  }
}
