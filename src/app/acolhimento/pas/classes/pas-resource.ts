import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import { PasService } from '../services/pas.service';
import { Injector, Input } from '@angular/core';

export  class PasResource extends DynamicFormTableResource {
  @Input() _id: string = undefined;
  protected pasService: PasService;
  constructor(protected injector: Injector) {
    super(injector);
    this.pasService = injector.get(PasService);
  }

  save() {
    this.pasService.save(this.form.value).subscribe((res) => {
      console.log(res);
    });
    console.log(this.form.value);
  }
}
