import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqViewVendorComponent } from './rfq-view-vendor.component';

describe('RfqViewVendorComponent', () => {
  let component: RfqViewVendorComponent;
  let fixture: ComponentFixture<RfqViewVendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqViewVendorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqViewVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
