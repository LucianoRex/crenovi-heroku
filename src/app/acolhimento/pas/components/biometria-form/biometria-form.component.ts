import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-biometria-form',
  templateUrl: './biometria-form.component.html',
  styleUrls: ['./biometria-form.component.css'],
})
export class BiometriaFormComponent extends PasResource implements OnInit {
  //@Output() notify = new EventEmitter();
  //apiUrl = environment.apiBaseUrl;

  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      //_id: undefined,
      path: 'biometria',
      biometria: this.fb.group({
        _id: undefined,
        data: [''],
        pa: [''],
      }),
    });
    this._id !== undefined
      ? this.pasService.readById('biometria', this._id).subscribe((res: any) => {
          this.form.get('biometria').patchValue(res);
        })
      : null;
  }
}
