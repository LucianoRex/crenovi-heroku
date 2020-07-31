import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoConvenioFormComponent } from './tipo-convenio-form.component';

describe('TipoConvenioFormComponent', () => {
  let component: TipoConvenioFormComponent;
  let fixture: ComponentFixture<TipoConvenioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoConvenioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoConvenioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
