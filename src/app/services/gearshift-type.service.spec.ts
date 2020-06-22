import { TestBed } from '@angular/core/testing';

import { GearshiftTypeService } from './gearshift-type.service';

describe('GearshiftTypeService', () => {
  let service: GearshiftTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GearshiftTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
