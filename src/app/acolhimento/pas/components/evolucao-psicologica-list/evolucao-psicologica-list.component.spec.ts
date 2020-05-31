import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucaoPsicologicaListComponent } from './evolucao-psicologica-list.component';

describe('EvolucaoPsicologicaListComponent', () => {
  let component: EvolucaoPsicologicaListComponent;
  let fixture: ComponentFixture<EvolucaoPsicologicaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolucaoPsicologicaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucaoPsicologicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
