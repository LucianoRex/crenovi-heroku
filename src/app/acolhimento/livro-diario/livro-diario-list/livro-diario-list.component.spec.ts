import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDiarioListComponent } from './livro-diario-list.component';

describe('LivroDiarioListComponent', () => {
  let component: LivroDiarioListComponent;
  let fixture: ComponentFixture<LivroDiarioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivroDiarioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivroDiarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
