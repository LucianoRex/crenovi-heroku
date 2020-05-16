import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcolhidoFormComponent } from './acolhido-form.component';

describe('AcolhidoFormComponent', () => {
  let component: AcolhidoFormComponent;
  let fixture: ComponentFixture<AcolhidoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcolhidoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcolhidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
