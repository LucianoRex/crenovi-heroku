import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import {
  Injector,
  Input,
  Inject,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import * as io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';
import { AcolhimentoService } from '../services/acolhimento.service';
import { environment } from 'src/environments/environment';

export class AcolhimentoResource extends DynamicFormTableResource {
  //socket = io(environment.SOCKET_ENDPOINT + '/acolhimento');
  socketdata: string;
  @Input() _id: string = undefined;
  @Output() saved = new EventEmitter<boolean>();
  protected acolhimentoService: AcolhimentoService;
 // private toastr: ToastrService;
  constructor(protected injector: Injector) {
    super(injector);
    this.acolhimentoService = injector.get(AcolhimentoService);
    //this.toastr = injector.get(ToastrService);
  }
  save() {
    //console.log(this.form.value);
    this.acolhimentoService.save(this.form.value).subscribe(
      (res) => {
        this.toastr.success('Salvo');
        //  console.log(res);
        this.selectedRow.emit(res);
        /*  this.socket.emit(
          this.form.get('path').value,
          this.form.get('path').value,
          res
        );*/
        //  this.acolhimentoService.emitSocket(this.form.value, res);
        this.saved.emit(true);
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  remove(path) {
    this.acolhimentoService.remove(path);
  }

  comparaData(dataI, dataF) {
    return dataI < dataF
  }
}
