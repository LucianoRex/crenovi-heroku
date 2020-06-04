import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFamiliarSocialFormComponent } from './historico-familiar-social-form.component';

describe('HistoricoFamiliarSocialFormComponent', () => {
  let component: HistoricoFamiliarSocialFormComponent;
  let fixture: ComponentFixture<HistoricoFamiliarSocialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoFamiliarSocialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoFamiliarSocialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
