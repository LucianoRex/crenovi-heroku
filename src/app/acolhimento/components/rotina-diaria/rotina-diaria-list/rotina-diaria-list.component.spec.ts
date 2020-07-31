import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotinaDiariaListComponent } from './rotina-diaria-list.component';

describe('RotinaDiariaListComponent', () => {
  let component: RotinaDiariaListComponent;
  let fixture: ComponentFixture<RotinaDiariaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotinaDiariaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotinaDiariaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
