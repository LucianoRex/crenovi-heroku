import { Component, OnInit, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Validators, FormGroup } from '@angular/forms';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saida-form',
  templateUrl: './saida-form.component.html',
  styleUrls: ['./saida-form.component.css'],
})
export class SaidaFormComponent extends ProntuarioResource implements OnInit {
  apiUrl = environment.apiBaseUrl;

  constructor(protected injector: Injector) {
    super(injector);
  }
  motivos;
  ngOnInit(): void {
    this.prontuarioService.motivoSaida().subscribe((res) => {
      this.motivos = res;
    });
    this.form = this.fb.group({
      path: 'saida',
      array: true,
      saida: this.fb.group(
        {
          _id: undefined,
          dataSaida: ['', Validators.required],
          dataRetorno: [''],
          motivo: ['', Validators.required],
          responsavel: ['', Validators.required],
        },
        {
          validators: this.comparaData('dataSaida', 'dataRetorno'),
        }
      ),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            this.form.get('saida').patchValue(res);
          })
      : null;
    this.notify.emit(this.form);  
   
  } 
}
