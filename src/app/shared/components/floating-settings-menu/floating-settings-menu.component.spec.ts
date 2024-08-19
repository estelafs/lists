import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingSettingsMenuComponent } from './floating-settings-menu.component';

describe('FloatingSettingsMenuComponent', () => {
  let component: FloatingSettingsMenuComponent;
  let fixture: ComponentFixture<FloatingSettingsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingSettingsMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloatingSettingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
