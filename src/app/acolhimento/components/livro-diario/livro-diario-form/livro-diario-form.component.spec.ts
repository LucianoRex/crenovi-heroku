import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDiarioFormComponent } from './livro-diario-form.component';

describe('LivroDiarioFormComponent', () => {
  let component: LivroDiarioFormComponent;
  let fixture: ComponentFixture<LivroDiarioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivroDiarioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroDiarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
