import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicListBuilderComponent } from './dynamic-list-builder.component';

describe('DynamicListBuilderComponent', () => {
  let component: DynamicListBuilderComponent;
  let fixture: ComponentFixture<DynamicListBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicListBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicListBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
