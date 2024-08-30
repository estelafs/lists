import { Component, Inject } from '@angular/core';
import { Category } from '../../../../shared/models/category.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { get } from 'lodash';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';

/**
 * Dialog data interface.
 */
interface DialogData {
  category?: Category;
}

/**
 * Manage (edit or create) category modal component.
 */
@Component({
  selector: 'app-manage-category-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    ColorPickerModule,
  ],
  templateUrl: './manage-category-modal.component.html',
  styleUrl: './manage-category-modal.component.scss'
})
export class ManageCategoryModalComponent {
  /** Item form group */
  public categoryFormGroup!: ReturnType<typeof this.getCategoryForm>;
  
  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) {
    this.categoryFormGroup = this.getCategoryForm();
  }

  /**
   * Creates and returns the from group. 
   *
   * @returns category from group
   */
  private getCategoryForm(): FormGroup {
    return this.formBuilder.group({
      name: [get(this.data?.category, 'name', ''), Validators.required],
      description: get(this.data?.category, 'description', ''),
      color: get(this.data?.category, 'color', ''),
    });
  }
}
