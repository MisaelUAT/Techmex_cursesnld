import { TestBed } from '@angular/core/testing';

import { ServiceStyles } from './service-styles';

describe('ServiceStyles', () => {
  let service: ServiceStyles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStyles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
