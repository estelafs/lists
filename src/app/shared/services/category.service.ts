/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestService } from '../../core/services/rest.service';

/**
 * Service to manage categories
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  /** Collection of all available categories */
  public categories = new BehaviorSubject<Category[]>([]);

  /** @returns Current categories as observable */
  get categories$(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  /** Fake REST API url to category collection */
  private url = 'http://localhost:3000/categories';

  constructor(private restService: RestService) {
    this.loadCategories();
  }

  /**
   * Gets the complete categories collection from the database
   *
   * @returns collection of categories
   */
  public async loadCategories(): Promise<void> {
    const categories = (await this.restService.get(this.url) ?? []) as Category[];
    this.categories.next(categories);
  }

  /**
   * Create a new category object.
   *
   * @param category category object to create
   */
  public async createCategory(category: Category): Promise<string> {
    const createdCategory = await this.restService.post(this.url, JSON.stringify(category));
    this.loadCategories();
    return (createdCategory as any)?.id;
  }

  /**
   * Update category object.
   *
   * @param category category updated to save
   */
  public async updateCategory(category: Category): Promise<void> {
    await this.restService.put(this.url + `/${category.id}`, JSON.stringify(category));
    this.loadCategories();
  }

  /**
   * Delete category.
   *
   * @param category category selected to delete
   */
  public async deleteCategory(category: Category): Promise<void> {
    await this.restService.delete(this.url + `/${category.id}`);
    this.loadCategories();
  }
}
