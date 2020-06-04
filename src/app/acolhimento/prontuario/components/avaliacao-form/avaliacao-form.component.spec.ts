import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoFormComponent } from './avaliacao-form.component';

describe('AvaliacaoFormComponent', () => {
  let component: AvaliacaoFormComponent;
  let fixture: ComponentFixture<AvaliacaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
