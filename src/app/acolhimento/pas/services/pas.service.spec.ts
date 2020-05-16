import { TestBed } from '@angular/core/testing';

import { PasService } from './pas.service';

describe('PasService', () => {
  let service: PasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
