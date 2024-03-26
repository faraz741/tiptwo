import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacesManagementComponent } from './races-management.component';

describe('RacesManagementComponent', () => {
  let component: RacesManagementComponent;
  let fixture: ComponentFixture<RacesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
