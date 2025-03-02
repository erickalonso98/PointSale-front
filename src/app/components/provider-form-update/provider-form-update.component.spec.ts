import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderFormUpdateComponent } from './provider-form-update.component';

describe('ProviderFormUpdateComponent', () => {
  let component: ProviderFormUpdateComponent;
  let fixture: ComponentFixture<ProviderFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderFormUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProviderFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
