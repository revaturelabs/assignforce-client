import { TestBed, inject } from '@angular/core/testing';

import { CachedObjectsService } from './cached-objects.service';

describe('CachedObjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CachedObjectsService]
    });
  });

  it('should be created', inject([CachedObjectsService], (service: CachedObjectsService) => {
    expect(service).toBeTruthy();
  }));
});
