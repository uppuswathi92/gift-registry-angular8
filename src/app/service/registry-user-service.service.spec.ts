import { TestBed } from '@angular/core/testing';

import { RegistryUserServiceService } from './registry-user-service.service';

describe('RegistryUserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistryUserServiceService = TestBed.get(RegistryUserServiceService);
    expect(service).toBeTruthy();
  });
});
