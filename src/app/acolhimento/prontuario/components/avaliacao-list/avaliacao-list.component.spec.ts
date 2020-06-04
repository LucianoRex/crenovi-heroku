import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoListComponent } from './avaliacao-list.component';

describe('AvaliacaoListComponent', () => {
  let component: AvaliacaoListComponent;
  let fixture: ComponentFixture<AvaliacaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
