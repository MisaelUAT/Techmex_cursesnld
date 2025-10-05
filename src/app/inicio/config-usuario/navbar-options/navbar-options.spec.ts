import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOptions } from './navbar-options';

describe('NavbarOptions', () => {
  let component: NavbarOptions;
  let fixture: ComponentFixture<NavbarOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
