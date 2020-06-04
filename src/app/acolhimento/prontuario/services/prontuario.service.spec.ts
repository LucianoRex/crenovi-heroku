import { TestBed } from '@angular/core/testing';

import { ProntuarioService } from './prontuario.service';

describe('PasService', () => {
  let service: ProntuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProntuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
