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
  convenios: any[] = [
    {
      _id: 1,
      nome: 'SUS',
    },
    {
      _id: 2,
      nome: 'SENAD',
    },
  ];

  encaminhado: any[] = [
    {
      _id: 1,
      nome: 'Hospital',
    },
    {
      _id: 2,
      nome: 'CAPS',
    },
  ];

  periodos: any[] = [
    {
      _id: 1,
      periodo: '9 meses',
    },
    {
      _id: 2,
      periodo: '12 meses',
    },
  ];
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: `responsavel`,
      responsavel: this.fb.group({
        _id: undefined,
        nome: ['', Validators.required],
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
