import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoencaFormComponent } from './doenca-form.component';

describe('DoencaFormComponent', () => {
  let component: DoencaFormComponent;
  let fixture: ComponentFixture<DoencaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoencaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoencaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
