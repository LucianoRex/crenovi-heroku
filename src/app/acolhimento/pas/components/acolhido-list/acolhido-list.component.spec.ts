import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcolhidoListComponent } from './acolhido-list.component';

describe('AcolhidoListComponent', () => {
  let component: AcolhidoListComponent;
  let fixture: ComponentFixture<AcolhidoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcolhidoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcolhidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
