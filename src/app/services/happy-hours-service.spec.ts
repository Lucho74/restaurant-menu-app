import { TestBed } from '@angular/core/testing';

import { HappyHoursService } from './happy-hours-service';

describe('HappyHoursService', () => {
  let service: HappyHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HappyHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
