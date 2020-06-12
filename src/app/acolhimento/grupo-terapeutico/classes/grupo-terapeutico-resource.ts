import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import { Injector, Input } from '@angular/core';
import { GrupoTerapeuticoService } from '../services/grupo-terapeutico.service';
import { ToastrService } from 'ngx-toastr';
import * as io from 'socket.io-client';

export class GrupoTerapeuticoResource extends DynamicFormTableResource {
  //socket = io('http://localhost:8080');
  protected grupoTerapeuticoService: GrupoTerapeuticoService;
  protected toastr: ToastrService;
  @Input() _id: string = undefined;
  constructor(protected injector: Injector) {
    super(injector);
    this.grupoTerapeuticoService = injector.get(GrupoTerapeuticoService);
    this.toastr = injector.get(ToastrService);
  }

  save() {
    //console.log(this.form.value);
    this.grupoTerapeuticoService.save(this.form.value).subscribe(
      (res) => {
        this.toastr.success('Salvo');
       // console.log(res);
        this.selectedRow.emit(res);
      //  this.socket.emit('updatedata', res);
      },
      (err) => {
        this.toastr.error(err, 'Erro ao salvar');
      }
    );
  }
}
