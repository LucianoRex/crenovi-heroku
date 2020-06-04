import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroClinicoFormComponent } from './quadro-clinico-form.component';

describe('QuadroClinicoFormComponent', () => {
  let component: QuadroClinicoFormComponent;
  let fixture: ComponentFixture<QuadroClinicoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadroClinicoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadroClinicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
