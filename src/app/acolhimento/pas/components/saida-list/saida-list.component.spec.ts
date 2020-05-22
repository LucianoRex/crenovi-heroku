import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaListComponent } from './saida-list.component';

describe('SaidaListComponent', () => {
  let component: SaidaListComponent;
  let fixture: ComponentFixture<SaidaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
