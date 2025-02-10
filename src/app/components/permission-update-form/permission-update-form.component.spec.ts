import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionUpdateFormComponent } from './permission-update-form.component';

describe('PermissionUpdateFormComponent', () => {
  let component: PermissionUpdateFormComponent;
  let fixture: ComponentFixture<PermissionUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
