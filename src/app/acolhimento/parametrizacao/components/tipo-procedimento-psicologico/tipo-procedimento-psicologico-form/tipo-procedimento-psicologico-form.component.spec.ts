import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProcedimentoPsicologicoFormComponent } from './tipo-procedimento-psicologico-form.component';

describe('TipoProcedimentoPsicologicoFormComponent', () => {
  let component: TipoProcedimentoPsicologicoFormComponent;
  let fixture: ComponentFixture<TipoProcedimentoPsicologicoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProcedimentoPsicologicoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProcedimentoPsicologicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
