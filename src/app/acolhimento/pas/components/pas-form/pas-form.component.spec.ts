import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasFormComponent } from './pas-form.component';

describe('PasFormComponent', () => {
  let component: PasFormComponent;
  let fixture: ComponentFixture<PasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
