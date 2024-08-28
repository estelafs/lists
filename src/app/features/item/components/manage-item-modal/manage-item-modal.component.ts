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
import { CategoryService } from '../../../../shared/services/category.service';
import { ManageCategoryModalComponent } from '../../../categories/components/manage-category-modal/manage-category-modal.component';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs';
import { UnsubscribeComponent } from '../../../../shared/components/unsubscribe/unsubscribe.component';

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
  ],
  templateUrl: './manage-item-modal.component.html',
  styleUrl: './manage-item-modal.component.scss'
})
export class ManageItemModalComponent extends UnsubscribeComponent {
  /** Item form group */
  public itemFormGroup!: ReturnType<typeof this.getItemForm>;
  /** List of measuring units */
  public measuringUnits: string[] = [];

  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    public categoryService: CategoryService,
    private dialog: MatDialog
  ) {
    super();

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
          const categoryId = await this.categoryService.createCategory(result);
          if (categoryId) {
            this.itemFormGroup.get('categoryId')?.setValue(categoryId);
          }
        }
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
