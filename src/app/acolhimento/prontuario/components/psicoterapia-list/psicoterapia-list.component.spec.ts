import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicoterapiaListComponent } from './psicoterapia-list.component';

describe('PsicoterapiaListComponent', () => {
  let component: PsicoterapiaListComponent;
  let fixture: ComponentFixture<PsicoterapiaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicoterapiaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicoterapiaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
