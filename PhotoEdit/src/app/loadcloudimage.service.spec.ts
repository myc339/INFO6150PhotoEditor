import { TestBed } from '@angular/core/testing';

import { LoadcloudimageService } from './loadcloudimage.service';

describe('LoadcloudimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadcloudimageService = TestBed.get(LoadcloudimageService);
    expect(service).toBeTruthy();
  });
});
