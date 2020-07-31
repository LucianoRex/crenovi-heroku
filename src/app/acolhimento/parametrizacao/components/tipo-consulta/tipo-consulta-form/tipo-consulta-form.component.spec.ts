import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoConsultaFormComponent } from './tipo-consulta-form.component';

describe('TipoConsultaFormComponent', () => {
  let component: TipoConsultaFormComponent;
  let fixture: ComponentFixture<TipoConsultaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoConsultaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoConsultaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
