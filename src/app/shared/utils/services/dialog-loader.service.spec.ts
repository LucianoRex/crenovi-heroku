import { TestBed } from '@angular/core/testing';

import { DialogLoaderService } from './dialog-loader.service';

describe('DialogLoaderService', () => {
  let service: DialogLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
