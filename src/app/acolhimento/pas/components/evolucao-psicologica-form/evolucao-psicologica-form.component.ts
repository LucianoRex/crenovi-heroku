import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-evolucao-psicologica-form',
  templateUrl: './evolucao-psicologica-form.component.html',
  styleUrls: ['./evolucao-psicologica-form.component.css'],
})
export class EvolucaoPsicologicaFormComponent extends PasResource
  implements OnInit {
  //@Output() notify = new EventEmitter();
  //apiUrl = environment.apiBaseUrl;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      //_id: undefined,
      path: 'evolucaoPsicologica',
      evolucaoPsicologica: this.fb.group({
        _id: undefined,
        data: [''],
        observacoes: [''],
      }),
    });
    this._id !== undefined
      ? this.pasService
          .readById('evolucaoPsicologica', this._id)
          .subscribe((res: any) => {
            this.form.get('evolucaoPsicologica').patchValue(res);
          })
      : null;
  }
}
