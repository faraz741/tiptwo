import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsManagementComponent } from './tips-management.component';

describe('TipsManagementComponent', () => {
  let component: TipsManagementComponent;
  let fixture: ComponentFixture<TipsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
