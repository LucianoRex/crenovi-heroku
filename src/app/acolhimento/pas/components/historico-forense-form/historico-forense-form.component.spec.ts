import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoForenseFormComponent } from './historico-forense-form.component';

describe('HistoricoForenseFormComponent', () => {
  let component: HistoricoForenseFormComponent;
  let fixture: ComponentFixture<HistoricoForenseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoForenseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoForenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
