import { TestBed } from '@angular/core/testing';

import { CloudPortalService } from './cloud-portal.service';

describe('CloudPortalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CloudPortalService = TestBed.get(CloudPortalService);
    expect(service).toBeTruthy();
  });
});
