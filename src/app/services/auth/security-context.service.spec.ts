import { TestBed, inject } from '@angular/core/testing';

import { SecurityContext } from './security-context.service';

describe('SecurityContext', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityContext]
    });
  });

  it('should be created', inject([SecurityContext], (service: SecurityContext) => {
    expect(service).toBeTruthy();
  }));
});
