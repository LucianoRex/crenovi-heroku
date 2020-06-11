import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotinaDiariaFormComponent } from './rotina-diaria-form.component';

describe('RotinaDiariaFormComponent', () => {
  let component: RotinaDiariaFormComponent;
  let fixture: ComponentFixture<RotinaDiariaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotinaDiariaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotinaDiariaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
