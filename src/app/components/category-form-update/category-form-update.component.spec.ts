import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFormUpdateComponent } from './category-form-update.component';

describe('CategoryFormUpdateComponent', () => {
  let component: CategoryFormUpdateComponent;
  let fixture: ComponentFixture<CategoryFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFormUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
