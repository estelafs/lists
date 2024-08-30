import { Component, Inject } from '@angular/core';
import { Item, MeasuringUnits } from '../../../../shared/models/item.model';
import { get } from 'lodash';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { UnsubscribeComponent } from '../../../../shared/components/unsubscribe/unsubscribe.component';
import { CategoryComponent } from "../../../categories/category.component";
import { CategoriesModalComponent } from '../../../categories/components/categories-modal/categories-modal.component';
import { Category } from '../../../../shared/models/category.model';

/**
 * Dialog data interface.
 */
interface DialogData {
  item?: Item;
  listId: number;
}

/**
 * Manage (edit or create) item modal component.
 */
@Component({
  selector: 'app-manage-item-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatSelectModule,
    CategoryComponent,
],
  templateUrl: './manage-item-modal.component.html',
  styleUrl: './manage-item-modal.component.scss'
})
export class ManageItemModalComponent extends UnsubscribeComponent {
  /** Item form group */
  public itemFormGroup!: ReturnType<typeof this.getItemForm>;
  /** List of measuring units */
  public measuringUnits: string[] = [];
  /** Selected category object, if any */
  public selectedCategory?: Category;

  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    super();
    this.selectedCategory = this.data.item?.category;
    // Generate form
    this.itemFormGroup = this.getItemForm();

    // Create list with type of measuring units
    for (const key in MeasuringUnits) {
      if (Object.prototype.hasOwnProperty.call(MeasuringUnits, key)) {
          this.measuringUnits.push(key);
      }
    }
  }

  /**
   * Open category modal to see all categories and select one
   */
  public openCategoriesModal(): void {
    const dialogRef = this.dialog.open(CategoriesModalComponent, {
      data: { category: this.selectedCategory },
      minWidth: 500
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((category: Category | undefined) => {
        this.selectedCategory = category;
        this.itemFormGroup.get('categoryId')?.setValue(category?.id ?? '');
        this.itemFormGroup.markAsDirty();
      });
  }

  /**
   * Creates and returns the from group. 
   *
   * @returns item from group
   */
  private getItemForm(): FormGroup {
    return this.formBuilder.group({
      name: [get(this.data?.item, 'name', ''), Validators.required],
      note: get(this.data?.item, 'note', ''),
      quantity: get(this.data?.item, 'quantity', null),
      unit: get(this.data?.item, 'unit', ''),
      categoryId: get(this.data?.item?.category, 'id', ''),
      checked: false,
      listId: this.data.listId,
    });
  }
}
