import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradorFormUpdateComponent } from './colaborador-form-update.component';

describe('ColaboradorFormUpdateComponent', () => {
  let component: ColaboradorFormUpdateComponent;
  let fixture: ComponentFixture<ColaboradorFormUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaboradorFormUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaboradorFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
