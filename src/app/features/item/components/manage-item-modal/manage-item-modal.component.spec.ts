import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageItemModalComponent } from './manage-item-modal.component';

describe('ManageItemModalComponent', () => {
  let component: ManageItemModalComponent;
  let fixture: ComponentFixture<ManageItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageItemModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
