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
 

 
}
