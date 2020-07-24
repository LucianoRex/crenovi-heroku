import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';
import { ProntuarioService } from '../../services/prontuario.service';

@Component({
  selector: 'app-agendamento-consulta-form',
  templateUrl: './agendamento-consulta-form.component.html',
  styleUrls: ['./agendamento-consulta-form.component.css'],
})
export class AgendamentoConsultaFormComponent extends ProntuarioResource
  implements OnInit {
  apiUrl = environment.apiBaseUrl;  
  tipos: any[] = [
    'Dentista',
    'Médico',
    'Psiquiatra',
    'Dentista',
    'Perito',
    'Psicólogo',
  ];
  constructor(protected injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    this.prontuarioService.tipoConsulta().subscribe((res) => {
      this.tipos = res;
    });
    this.form = this.fb.group({      
      array: true,
      path: 'agendamentoconsulta',
      agendamentoconsulta: this.fb.group({
        _id: undefined,
        data: ['', Validators.required],
        horario: ['', Validators.required],
        local: ['', Validators.required],
        tipo: [''],
        consultaEfetuada: [false],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {                       
            this.form.get('agendamentoconsulta').patchValue(res);
          })
      : null;
    this.notify.emit(this.form);
  }

 
}
