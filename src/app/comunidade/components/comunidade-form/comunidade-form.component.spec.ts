import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadeFormComponent } from './comunidade-form.component';

describe('ComunidadeFormComponent', () => {
  let component: ComunidadeFormComponent;
  let fixture: ComponentFixture<ComunidadeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunidadeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
