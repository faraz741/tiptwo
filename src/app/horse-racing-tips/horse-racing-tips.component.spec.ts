import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseRacingTipsComponent } from './horse-racing-tips.component';

describe('HorseRacingTipsComponent', () => {
  let component: HorseRacingTipsComponent;
  let fixture: ComponentFixture<HorseRacingTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorseRacingTipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorseRacingTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
