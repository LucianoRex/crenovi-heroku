import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoConsultaFormComponent } from './agendamento-consulta-form.component';

describe('AgendamentoConsultaFormComponent', () => {
  let component: AgendamentoConsultaFormComponent;
  let fixture: ComponentFixture<AgendamentoConsultaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendamentoConsultaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentoConsultaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
