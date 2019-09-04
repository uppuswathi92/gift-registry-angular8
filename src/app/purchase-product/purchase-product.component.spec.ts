import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProductComponent } from './purchase-product.component';

describe('PurchaseProductComponent', () => {
  let component: PurchaseProductComponent;
  let fixture: ComponentFixture<PurchaseProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
