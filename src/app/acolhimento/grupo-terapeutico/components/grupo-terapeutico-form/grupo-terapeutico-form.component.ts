import { Component, OnInit, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GrupoTerapeuticoResource } from '../../classes/grupo-terapeutico-resource';

@Component({
  selector: 'app-grupo-terapeutico-form',
  templateUrl: './grupo-terapeutico-form.component.html',
  styleUrls: ['./grupo-terapeutico-form.component.css'],
})
export class GrupoTerapeuticoFormComponent extends GrupoTerapeuticoResource
  implements OnInit {
  apiUrl = environment.apiBaseUrl;

  constructor(
    protected injector: Injector //  protected datePipe: DatePipe, //  protected renderer: Renderer2
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.grupoTerapeuticoService.grupoTerapeutico_id = this._id;
    this.form = this.fb.group({
      _id: undefined,
      nome: [''],
    });
    this._id !== undefined
      ? this.grupoTerapeuticoService
          .readById(this._id)
          .subscribe((res: any) => {
        //    console.log(res);
            this.form.patchValue(res);
          })
      : null;
    //this.notify.emit(this.form);
  }
}
