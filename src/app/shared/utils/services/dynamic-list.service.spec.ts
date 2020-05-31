import { TestBed } from '@angular/core/testing';

import { DynamicListService } from './dynamic-list.service';

describe('DynamicListService', () => {
  let service: DynamicListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
