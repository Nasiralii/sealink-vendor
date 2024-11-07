import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailsVendorComponent } from './rfq-details-vendor.component';

describe('RfqDetailsVendorComponent', () => {
  let component: RfqDetailsVendorComponent;
  let fixture: ComponentFixture<RfqDetailsVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqDetailsVendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqDetailsVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
