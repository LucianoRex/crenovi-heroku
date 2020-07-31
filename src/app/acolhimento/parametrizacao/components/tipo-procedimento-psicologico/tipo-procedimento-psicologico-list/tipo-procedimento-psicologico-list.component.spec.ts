import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProcedimentoPsicologicoListComponent } from './tipo-procedimento-psicologico-list.component';

describe('TipoProcedimentoPsicologicoListComponent', () => {
  let component: TipoProcedimentoPsicologicoListComponent;
  let fixture: ComponentFixture<TipoProcedimentoPsicologicoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoProcedimentoPsicologicoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoProcedimentoPsicologicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
