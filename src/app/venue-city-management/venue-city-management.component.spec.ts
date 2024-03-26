import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCityManagementComponent } from './venue-city-management.component';

describe('VenueCityManagementComponent', () => {
  let component: VenueCityManagementComponent;
  let fixture: ComponentFixture<VenueCityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueCityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueCityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
