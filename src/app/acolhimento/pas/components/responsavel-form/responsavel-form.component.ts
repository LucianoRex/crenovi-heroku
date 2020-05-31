import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Injector,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-responsavel-form',
  templateUrl: './responsavel-form.component.html',
  styleUrls: ['./responsavel-form.component.css'],
})
export class ResponsavelFormComponent extends PasResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: `responsavel`,
      responsavel: this.fb.group({
        _id: undefined,
        nome: ['', Validators.required],
        telefone: [''],
        email: [''],
        rg: [''],
        cpf: [''],
      }),
    });
    this._id !== undefined
      ? this.pasService.readById('responsavel').subscribe((res) => {
          this.form.patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }
}
