import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Category } from '../../shared/models/category.model';

/**
 * Category component.
 */
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [TagModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  /** Category input */
  @Input() category!: Category;
}
