import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFormUpdateComponent } from './role-form-update.component';

describe('RoleFormUpdateComponent', () => {
  let component: RoleFormUpdateComponent;
  let fixture: ComponentFixture<RoleFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleFormUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
