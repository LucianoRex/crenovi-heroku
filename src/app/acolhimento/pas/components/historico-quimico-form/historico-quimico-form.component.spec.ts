import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoQuimicoFormComponent } from './historico-quimico-form.component';

describe('HistoricoQuimicoFormComponent', () => {
  let component: HistoricoQuimicoFormComponent;
  let fixture: ComponentFixture<HistoricoQuimicoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoQuimicoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoQuimicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
