import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVenderComponent } from './dashboard-vender.component';

describe('DashboardVenderComponent', () => {
  let component: DashboardVenderComponent;
  let fixture: ComponentFixture<DashboardVenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
