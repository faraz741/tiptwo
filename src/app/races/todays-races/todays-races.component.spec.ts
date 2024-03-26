import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysRacesComponent } from './todays-races.component';

describe('TodaysRacesComponent', () => {
  let component: TodaysRacesComponent;
  let fixture: ComponentFixture<TodaysRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysRacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
