import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSpaFormComponent } from './tipo-spa-form.component';

describe('TipoSpaFormComponent', () => {
  let component: TipoSpaFormComponent;
  let fixture: ComponentFixture<TipoSpaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoSpaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSpaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
