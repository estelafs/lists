import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyIndicatorComponent } from './empty-indicator.component';

describe('EmptyIndicatorComponent', () => {
  let component: EmptyIndicatorComponent;
  let fixture: ComponentFixture<EmptyIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
