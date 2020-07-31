import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAcolhidoFormComponent } from './item-acolhido-form.component';

describe('ItemAcolhidoFormComponent', () => {
  let component: ItemAcolhidoFormComponent;
  let fixture: ComponentFixture<ItemAcolhidoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAcolhidoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAcolhidoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
