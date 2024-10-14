import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmscalendarComponent } from './lmscalendar.component';

describe('LmscalendarComponent', () => {
  let component: LmscalendarComponent;
  let fixture: ComponentFixture<LmscalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmscalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LmscalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
