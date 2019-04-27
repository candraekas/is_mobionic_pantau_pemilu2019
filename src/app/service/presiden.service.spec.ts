import { TestBed } from '@angular/core/testing';

import { PresidenService } from './presiden.service';

describe('PresidenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresidenService = TestBed.get(PresidenService);
    expect(service).toBeTruthy();
  });
});
