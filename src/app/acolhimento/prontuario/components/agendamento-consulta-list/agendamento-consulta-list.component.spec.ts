import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoConsultaListaComponent } from './agendamento-consulta-list.component';

describe('AgendamentoConsultaListaComponent', () => {
  let component: AgendamentoConsultaListaComponent;
  let fixture: ComponentFixture<AgendamentoConsultaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamentoConsultaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoConsultaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
