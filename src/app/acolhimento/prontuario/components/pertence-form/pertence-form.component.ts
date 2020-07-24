import { Component, OnInit, Injector, Input } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';

@Component({
  selector: 'app-pertence-form',
  templateUrl: './pertence-form.component.html',
  styleUrls: ['./pertence-form.component.css'],
})
export class PertenceFormComponent extends ProntuarioResource
  implements OnInit {
  @Input() _id: string;
  itens: any;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.prontuarioService.pertenceAcolhido().subscribe((res) => {
      console.log(res);
      this.itens = res;
    });

    this.form = this.fb.group({
      path: 'pertence',
      array: true,
      pertence: this.fb.group({
        _id: undefined,
        item: [''],
        quantidade: ['1'],
      }),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            console.log(res);
            this.form.get('pertence').patchValue(res);
          })
      : null;
  }
}
