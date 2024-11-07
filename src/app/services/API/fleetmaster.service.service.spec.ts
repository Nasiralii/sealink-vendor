import { TestBed } from '@angular/core/testing';

import { FleetmasterServiceService } from './fleetmaster.service.service';

describe('FleetmasterServiceService', () => {
  let service: FleetmasterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FleetmasterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
