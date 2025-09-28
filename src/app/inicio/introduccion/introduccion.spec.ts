import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Introduccion } from './introduccion';

describe('Introduccion', () => {
  let component: Introduccion;
  let fixture: ComponentFixture<Introduccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Introduccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Introduccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
