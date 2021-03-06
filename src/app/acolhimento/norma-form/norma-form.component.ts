import { Component, OnInit, Injector } from '@angular/core';
import { AcolhimentoResource } from '../classes/acolhimento-resource';

@Component({
  selector: 'app-norma-form',
  templateUrl: './norma-form.component.html',
  styleUrls: ['./norma-form.component.css'],
})
export class NormaFormComponent extends AcolhimentoResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: undefined,
      path: 'norma',
      texto: [''],
    });

    this.acolhimentoService.read('norma').subscribe((res: any) => {      
      this.form.patchValue(res);
      this.form.patchValue({ _id: undefined });
    });
  }
}
