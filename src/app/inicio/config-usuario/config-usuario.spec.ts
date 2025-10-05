import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigUsuario } from './config-usuario';

describe('ConfigUsuario', () => {
  let component: ConfigUsuario;
  let fixture: ComponentFixture<ConfigUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
