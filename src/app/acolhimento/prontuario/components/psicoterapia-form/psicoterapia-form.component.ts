import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-psicoterapia-form',
  templateUrl: './psicoterapia-form.component.html',
  styleUrls: ['./psicoterapia-form.component.css'],
})
export class PsicoterapiaFormComponent extends ProntuarioResource
  implements OnInit {
  procedimentos: any[];
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      //_id: undefined,
      array: true,
      path: 'psicoterapia',
      psicoterapia: this.fb.group({
        _id: undefined,
        data: [''],
        procedimento: [''],
        observacoes: [''],
      }),
    });
    this.prontuarioService.procedimentoPsicologico().subscribe((res) => {
      this.procedimentos = res;
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            this.form.get('psicoterapia').patchValue(res);
            //, { emitEvent: false, onlySelf: true }
          })
      : this.form.get('psicoterapia').get('data').patchValue(new Date());

    //this.form.statusChanges.subscribe();
  }
}
