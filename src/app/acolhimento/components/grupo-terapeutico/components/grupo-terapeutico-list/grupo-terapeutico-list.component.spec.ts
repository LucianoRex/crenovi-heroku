import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoTerapeuticoListComponent } from './grupo-terapeutico-list.component';

describe('GrupoTerapeuticoListComponent', () => {
  let component: GrupoTerapeuticoListComponent;
  let fixture: ComponentFixture<GrupoTerapeuticoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoTerapeuticoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoTerapeuticoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
