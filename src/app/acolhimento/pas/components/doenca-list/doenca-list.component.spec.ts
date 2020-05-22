import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoencaListComponent } from './doenca-list.component';

describe('DoencaListComponent', () => {
  let component: DoencaListComponent;
  let fixture: ComponentFixture<DoencaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoencaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoencaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
