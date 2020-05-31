import { TestBed } from '@angular/core/testing';

import { AcolhimentoService } from './acolhimento.service';

describe('AcolhimentoService', () => {
  let service: AcolhimentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcolhimentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
