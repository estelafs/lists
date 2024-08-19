import { Component, Inject } from '@angular/core';
import { List } from '../../../../shared/models/list.model';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import {
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
import { get } from 'lodash';

/**
 * Dialog data interface.
 */
interface DialogData {
  list?: List;
  order?: number;
}

/**
 * Manage (edit or create) list modal component.
 */
@Component({
  selector: 'app-manage-list-modal',
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
  ],
  templateUrl: './manage-list-modal.component.html',
  styleUrl: './manage-list-modal.component.scss'
})
export class ManageListModalComponent {
  /** List form group */
  public listFormGroup!: ReturnType<typeof this.getListForm>;

  constructor(
    @Inject(DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
  ) {
    this.listFormGroup = this.getListForm();
  }


  private getListForm(): FormGroup {
    return this.formBuilder.group({
      name: [get(this.data?.list, 'name', ''), Validators.required],
      description: get(this.data?.list, 'description', ''),
      order: [get(this.data?.list, 'order', this.data.order ?? 1), Validators.required],
    });
  }
}
