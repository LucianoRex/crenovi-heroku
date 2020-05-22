import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import { PasService } from '../services/pas.service';
import { Injector, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

export class PasResource extends DynamicFormTableResource {
  socket = io('http://localhost:4000');
  @Input() _id: string = undefined;
  protected pasService: PasService;
  private toastr: ToastrService;
  constructor(protected injector: Injector) {
    super(injector);
    this.pasService = injector.get(PasService);
    this.toastr = injector.get(ToastrService);
  }
  save() {
    this.pasService.save(this.form.value).subscribe(
      (res) => {
        this.toastr.success('Salvo');
        console.log(res);
        this.selectedRow.emit(res);
        this.socket.emit('updatedata', res);
      },
      (err) => {
        this.toastr.error(err.error.message, 'Erro ao salvar');
      }
    );
  }

  remove() {
    this.pasService.remove();
  }
}
