import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaFormComponent } from './norma-form.component';

describe('NormaFormComponent', () => {
  let component: NormaFormComponent;
  let fixture: ComponentFixture<NormaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
