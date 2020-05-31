import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolucaoPsicologicaFormComponent } from './evolucao-psicologica-form.component';

describe('EvolucaoPsicologicaFormComponent', () => {
  let component: EvolucaoPsicologicaFormComponent;
  let fixture: ComponentFixture<EvolucaoPsicologicaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolucaoPsicologicaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolucaoPsicologicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
