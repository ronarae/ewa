import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagejeansoverviewComponent } from './managejeansoverview.component';

describe('ManagejeansoverviewComponent', () => {
  let component: ManagejeansoverviewComponent;
  let fixture: ComponentFixture<ManagejeansoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagejeansoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagejeansoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
