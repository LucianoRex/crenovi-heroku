import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoQuimicoListComponent } from './historico-quimico-list.component';

describe('HistoricoQuimicoListComponent', () => {
  let component: HistoricoQuimicoListComponent;
  let fixture: ComponentFixture<HistoricoQuimicoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoQuimicoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoQuimicoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
