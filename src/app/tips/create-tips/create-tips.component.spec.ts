import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTipsComponent } from './create-tips.component';

describe('CreateTipsComponent', () => {
  let component: CreateTipsComponent;
  let fixture: ComponentFixture<CreateTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
