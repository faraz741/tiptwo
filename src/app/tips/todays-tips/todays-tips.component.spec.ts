import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysTipsComponent } from './todays-tips.component';

describe('TodaysTipsComponent', () => {
  let component: TodaysTipsComponent;
  let fixture: ComponentFixture<TodaysTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysTipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
