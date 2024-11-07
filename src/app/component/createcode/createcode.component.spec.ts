import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecodeComponent } from './createcode.component';

describe('CreatecodeComponent', () => {
  let component: CreatecodeComponent;
  let fixture: ComponentFixture<CreatecodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecodeComponent]
    });
    fixture = TestBed.createComponent(CreatecodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
