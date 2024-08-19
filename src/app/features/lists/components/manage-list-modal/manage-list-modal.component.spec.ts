import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListModalComponent } from './manage-list-modal.component';

describe('ManageListModalComponent', () => {
  let component: ManageListModalComponent;
  let fixture: ComponentFixture<ManageListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
