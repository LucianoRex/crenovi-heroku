import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-biometria-form',
  templateUrl: './biometria-form.component.html',
  styleUrls: ['./biometria-form.component.css'],
})
export class BiometriaFormComponent extends ProntuarioResource
  implements OnInit {
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {    
    this.form = this.fb.group({
      path: 'biometria',
      array: true,
      biometria: this.fb.group({
        _id: undefined,
        data: ['', Validators.required],
        pa: [''],
        peso: [''],
        glicemia: [''],
        altura: [''],
      }),
    });

    this.form.valueChanges.subscribe((e) => {
      this.formChange.emit(true);
    });

    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            this.form.get('biometria').patchValue(res);
          })
      : this.form.get('biometria').get('data').patchValue(new Date());
  }
}
