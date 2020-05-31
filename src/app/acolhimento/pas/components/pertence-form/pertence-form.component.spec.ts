import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PertenceFormComponent } from './pertence-form.component';

describe('PertenceFormComponent', () => {
  let component: PertenceFormComponent;
  let fixture: ComponentFixture<PertenceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PertenceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PertenceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
