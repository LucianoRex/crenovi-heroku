import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaFormComponent } from './saida-form.component';

describe('SaidaFormComponent', () => {
  let component: SaidaFormComponent;
  let fixture: ComponentFixture<SaidaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
