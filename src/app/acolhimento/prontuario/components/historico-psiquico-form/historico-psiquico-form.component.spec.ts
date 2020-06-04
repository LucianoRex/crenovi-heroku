import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPsiquicoFormComponent } from './historico-psiquico-form.component';

describe('HistoricoPsiquicoFormComponent', () => {
  let component: HistoricoPsiquicoFormComponent;
  let fixture: ComponentFixture<HistoricoPsiquicoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoPsiquicoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoPsiquicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
