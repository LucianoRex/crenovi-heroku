import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProntuarioFormComponent } from './prontuario-form.component';


describe('PasFormComponent', () => {
  let component: ProntuarioFormComponent;
  let fixture: ComponentFixture<ProntuarioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProntuarioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProntuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
