import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableBuilderComponent } from './dynamic-table-builder.component';

describe('DynamicTableBuilderComponent', () => {
  let component: DynamicTableBuilderComponent;
  let fixture: ComponentFixture<DynamicTableBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTableBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTableBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
