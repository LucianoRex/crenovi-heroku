import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAcolhidoListComponent } from './item-acolhido-list.component';

describe('ItemAcolhidoListComponent', () => {
  let component: ItemAcolhidoListComponent;
  let fixture: ComponentFixture<ItemAcolhidoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAcolhidoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAcolhidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
