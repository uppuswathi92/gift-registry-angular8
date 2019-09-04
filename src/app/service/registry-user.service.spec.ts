import { TestBed } from '@angular/core/testing';

import { RegistryUserService } from './registry-user.service';

describe('RegistryUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistryUserService = TestBed.get(RegistryUserService);
    expect(service).toBeTruthy();
  });
});
