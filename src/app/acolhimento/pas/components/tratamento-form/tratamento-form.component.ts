import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';


@Component({
  selector: 'app-tratamento-form',
  templateUrl: './tratamento-form.component.html',
  styleUrls: ['./tratamento-form.component.css'],
})
export class TratamentoFormComponent extends PasResource implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: `tratamento`,
      tratamento: this.fb.group({
        desintoxicacao: [false],
        reducaoDano: [false],
        grupoApoio: [false],
        ct: [false],      
      }),
    });
    this._id !== undefined
      ? this.pasService.readById('tratamento').subscribe((res) => {
          this.form.patchValue(res);
        })
      : null;
    this.notify.emit(this.form);
  }
}
