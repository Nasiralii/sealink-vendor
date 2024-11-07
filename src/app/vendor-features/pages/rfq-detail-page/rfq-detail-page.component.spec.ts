import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailPageComponent } from './rfq-detail-page.component';

describe('RfqDetailPageComponent', () => {
  let component: RfqDetailPageComponent;
  let fixture: ComponentFixture<RfqDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqDetailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
