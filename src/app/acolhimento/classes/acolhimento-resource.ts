import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import { Injector, Input, Inject, Component } from '@angular/core';
import * as io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';
import { AcolhimentoService } from '../services/acolhimento.service';

export class AcolhimentoResource extends DynamicFormTableResource {
  socket = io('http://localhost:8080');
  socketdata: string;
  @Input() _id: string = undefined;
  protected acolhimentoService: AcolhimentoService;
  private toastr: ToastrService;
  constructor(protected injector: Injector) {
    super(injector);
    this.acolhimentoService = injector.get(AcolhimentoService);
    this.toastr = injector.get(ToastrService);
  }
  save() {
    console.log(this.form.value);
    this.acolhimentoService.save(this.form.value).subscribe(
      (res) => {
        this.toastr.success('Salvo');
        console.log(res);
        this.selectedRow.emit(res);
        this.socket.emit('updatedata', res);
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  remove() {
    this.acolhimentoService.remove();
  }
}
