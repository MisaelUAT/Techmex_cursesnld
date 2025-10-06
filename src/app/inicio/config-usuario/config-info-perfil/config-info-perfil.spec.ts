import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigInfoPerfil } from './config-info-perfil';

describe('ConfigInfoPerfil', () => {
  let component: ConfigInfoPerfil;
  let fixture: ComponentFixture<ConfigInfoPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigInfoPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigInfoPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
