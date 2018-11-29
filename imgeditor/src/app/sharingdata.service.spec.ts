import { TestBed } from '@angular/core/testing';

import { SharingdataService } from './sharingdata.service';

describe('SharingdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharingdataService = TestBed.get(SharingdataService);
    expect(service).toBeTruthy();
  });
});
