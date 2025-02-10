import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProviderComponent } from './detail-provider.component';

describe('DetailProviderComponent', () => {
  let component: DetailProviderComponent;
  let fixture: ComponentFixture<DetailProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProviderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
