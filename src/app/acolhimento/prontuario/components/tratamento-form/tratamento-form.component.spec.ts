import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamentoFormComponent } from './tratamento-form.component';

describe('TratamentoFormComponent', () => {
  let component: TratamentoFormComponent;
  let fixture: ComponentFixture<TratamentoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamentoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
