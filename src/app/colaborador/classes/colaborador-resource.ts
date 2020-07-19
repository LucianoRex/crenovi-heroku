import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import { Injector, Input, Inject, Component } from '@angular/core';
import * as io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from '../services/colaborador.service';
import { environment } from 'src/environments/environment';


export class ColaboradorResource extends DynamicFormTableResource {
  socket = io(environment.SOCKET_ENDPOINT);
  socketdata: string;
  @Input() _id: string = undefined;
  protected colaboradorService: ColaboradorService;  
  constructor(protected injector: Injector) {
    super(injector);
    this.colaboradorService = injector.get(ColaboradorService);    
  }
  save() {
    console.log(this.form.value);
    this.colaboradorService.save(this.form.value).subscribe(
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
   // this.colaboradorService.remove();
  }
}
