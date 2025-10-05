import { TestBed } from '@angular/core/testing';

import { ConfigUser } from './config-user';

describe('ConfigUser', () => {
  let service: ConfigUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
