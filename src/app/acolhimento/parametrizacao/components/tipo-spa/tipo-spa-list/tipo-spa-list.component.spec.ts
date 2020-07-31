import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoSpaListComponent } from './tipo-spa-list.component';

describe('TipoSpaListComponent', () => {
  let component: TipoSpaListComponent;
  let fixture: ComponentFixture<TipoSpaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoSpaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoSpaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
