import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBettingDetailsComponent } from './user-betting-details.component';

describe('UserBettingDetailsComponent', () => {
  let component: UserBettingDetailsComponent;
  let fixture: ComponentFixture<UserBettingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBettingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBettingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
