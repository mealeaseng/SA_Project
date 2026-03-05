import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Typeoffood } from './typeoffood';

describe('Typeoffood', () => {
  let component: Typeoffood;
  let fixture: ComponentFixture<Typeoffood>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Typeoffood]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Typeoffood);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
