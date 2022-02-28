import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInvoiceComponent } from './item-invoice.component';

describe('ItemInvoiceComponent', () => {
  let component: ItemInvoiceComponent;
  let fixture: ComponentFixture<ItemInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
