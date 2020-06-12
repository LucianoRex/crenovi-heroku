import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Injector,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-responsavel-form',
  templateUrl: './responsavel-form.component.html',
  styleUrls: ['./responsavel-form.component.css'],
})
export class ResponsavelFormComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {    
    this.form = this.fb.group({
      path: `responsavel`,
      responsavel: this.fb.group({
        _id: 'responsavel',
        nome: ['', Validators.required],
        telefone: [''],
        email: [''],
        rg: [''],
        cpf: [''],
      }),
    });
    this.form.valueChanges.subscribe((e) => {
      // this.mudouForm = true;
      this.formChange.emit(true);
      this.notify.emit(this.form);
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, 'responsavel')
          .subscribe((res) => {
            this.form.patchValue(res);
          })
      : null;

    this.notify.emit(this.form);
  }
}
