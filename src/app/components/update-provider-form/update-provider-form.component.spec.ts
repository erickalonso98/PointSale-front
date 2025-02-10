import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProviderFormComponent } from './update-provider-form.component';

describe('UpdateProviderFormComponent', () => {
  let component: UpdateProviderFormComponent;
  let fixture: ComponentFixture<UpdateProviderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProviderFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProviderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
