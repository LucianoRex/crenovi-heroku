import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Injector,
} from '@angular/core';
import { PasResource } from '../classes/pas-resource';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-responsavel-form',
  templateUrl: './responsavel-form.component.html',
  styleUrls: ['./responsavel-form.component.css'],
})
export class ResponsavelFormComponent extends PasResource implements OnInit {
  @Output() notify = new EventEmitter();
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
      // _id:[''],
      responsavel: this.fb.group({
        //    _id: [''],
        nome: ['', Validators.required],
      }),
    });
    this._id !== undefined
      ? this.pasService.readById(this._id).subscribe((res) => {
          this.form.patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
    console.log(this.form)
  }
}
