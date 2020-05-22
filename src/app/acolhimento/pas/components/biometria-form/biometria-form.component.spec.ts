import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometriaFormComponent } from './biometria-form.component';

describe('BiometriaFormComponent', () => {
  let component: BiometriaFormComponent;
  let fixture: ComponentFixture<BiometriaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiometriaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
