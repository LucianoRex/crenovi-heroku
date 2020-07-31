import { TestBed } from '@angular/core/testing';

import { GrupoTerapeuticoService } from './grupo-terapeutico.service';

describe('GrupoTerapeuticoService', () => {
  let service: GrupoTerapeuticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoTerapeuticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
