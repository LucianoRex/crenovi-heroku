import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasListComponent } from './pas-list.component';

describe('PasListComponent', () => {
  let component: PasListComponent;
  let fixture: ComponentFixture<PasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
