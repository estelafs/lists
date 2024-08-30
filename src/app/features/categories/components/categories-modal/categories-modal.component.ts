import { Component, Inject } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UnsubscribeComponent } from '../../../../shared/components/unsubscribe/unsubscribe.component';
import { ManageCategoryModalComponent } from '../manage-category-modal/manage-category-modal.component';
import { takeUntil } from 'rxjs';
import { CategoryComponent } from '../../category.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { EmptyIndicatorComponent } from '../../../../shared/components/empty-indicator/empty-indicator.component';
import { Category } from '../../../../shared/models/category.model';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

/**
 * Dialog data interface.
 */
interface DialogData {
  category?: Category;
}

/**
 * Categories modal component.
 */
@Component({
  selector: 'app-categories-modal',
  standalone: true,
  imports: [
    CommonModule,
    CategoryComponent,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    EmptyIndicatorComponent,
    MatButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './categories-modal.component.html',
  styleUrl: './categories-modal.component.scss'
})
export class CategoriesModalComponent extends UnsubscribeComponent {
  /** Selected category object, if any */
  public selectedCategory?: Category;

  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    public categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private dialog: MatDialog
  ) {
    super();
    this.selectedCategory = this.data.category;
  }

  /**
   * Handle click on edit category opening modal
   */
  public async onEditCategory(category: Category): Promise<void> {
    const dialogRef = this.dialog.open(ManageCategoryModalComponent, {
      data: { category },
      minWidth: 500
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async result => {
        if (result) {
          await this.categoryService.updateCategory({ ...result, id: category.id });
        }
      });
  }

  /**
   * Handle click create new category opening modal
   */
  public async createCategory(): Promise<void> {
    const dialogRef = this.dialog.open(ManageCategoryModalComponent, {
      data: {},
      minWidth: 500
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(async result => {
        if (result) {
          await this.categoryService.createCategory(result);
        }
      });
  }

  /**
   * Handle click in the delete category option 
   *
   * @param category category to be deleted
   */
  public onDeleteCategory(category: Category): void {
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete the category '${category.name}'?`,
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      key: 'confirmDelete',
      accept: () => {
        this.categoryService.deleteCategory(category);
      }
    });
  }
}
