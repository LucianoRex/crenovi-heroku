import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTerapeuticoFormComponent } from './grupo-terapeutico-form.component';

describe('GrupoTerapeuticoFormComponent', () => {
  let component: GrupoTerapeuticoFormComponent;
  let fixture: ComponentFixture<GrupoTerapeuticoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTerapeuticoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTerapeuticoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
