import { TestBed } from '@angular/core/testing';

import { AcolhimentoRelatorioService } from './acolhimento-relatorio.service';

describe('AcolhimentoRelatorioService', () => {
  let service: AcolhimentoRelatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcolhimentoRelatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
