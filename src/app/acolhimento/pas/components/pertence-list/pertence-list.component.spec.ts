import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PertenceListComponent } from './pertence-list.component';

describe('PertenceListComponent', () => {
  let component: PertenceListComponent;
  let fixture: ComponentFixture<PertenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PertenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PertenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
