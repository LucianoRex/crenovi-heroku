import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoConsultaListComponent } from './tipo-consulta-list.component';

describe('TipoConsultaListComponent', () => {
  let component: TipoConsultaListComponent;
  let fixture: ComponentFixture<TipoConsultaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoConsultaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoConsultaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
