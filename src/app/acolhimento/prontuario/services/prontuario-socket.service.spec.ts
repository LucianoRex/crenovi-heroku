import { TestBed } from '@angular/core/testing';

import { ProntuarioSocketService } from './prontuario-socket.service';

describe('ProntuarioSocketService', () => {
  let service: ProntuarioSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProntuarioSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
