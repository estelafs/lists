import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoryModalComponent } from './manage-category-modal.component';

describe('ManageCategoryModalComponent', () => {
  let component: ManageCategoryModalComponent;
  let fixture: ComponentFixture<ManageCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCategoryModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
