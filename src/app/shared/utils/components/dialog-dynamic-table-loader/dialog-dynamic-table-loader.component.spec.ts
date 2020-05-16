import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDynamicTableLoaderComponent } from './dialog-dynamic-table-loader.component';

describe('DialogDynamicTableLoaderComponent', () => {
  let component: DialogDynamicTableLoaderComponent;
  let fixture: ComponentFixture<DialogDynamicTableLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDynamicTableLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDynamicTableLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
