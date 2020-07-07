import { TestBed } from '@angular/core/testing';

import { AcolhidoService } from './acolhido.service';

describe('AcolhidoService', () => {
  let service: AcolhidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcolhidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
