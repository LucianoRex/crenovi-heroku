import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicoterapiaFormComponent } from './psicoterapia-form.component';

describe('PsicoterapiaFormComponent', () => {
  let component: PsicoterapiaFormComponent;
  let fixture: ComponentFixture<PsicoterapiaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicoterapiaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicoterapiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
