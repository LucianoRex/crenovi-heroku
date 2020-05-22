import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometriaListComponent } from './biometria-list.component';

describe('BiometriaListComponent', () => {
  let component: BiometriaListComponent;
  let fixture: ComponentFixture<BiometriaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiometriaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
