import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { ProntuarioService } from '../../services/prontuario.service';
import { Store } from '@ngrx/store';
import * as prontuarioActions from "../../state/prontuario.actions";
import * as fromProntuario from "../../state/prontuario.reducer";
import { Observable } from 'rxjs';
import { Prontuario } from '../../models/prontuario';

@Component({
  selector: 'app-prontuario-form',
  templateUrl: './prontuario-form.component.html',
  styleUrls: ['./prontuario-form.component.css'],
})
export class ProntuarioFormComponent extends ProntuarioResource
  implements OnInit {
  isLinear = false;
  identificacaoForm: FormGroup;
  responsavelForm: FormGroup;
  historicoPsiquicoForm: FormGroup;
  historicoFamiliarSocialForm: FormGroup;
  historicoForenseForm: FormGroup;
  tratamentoForm: FormGroup;
  quadroClinicoForm: FormGroup;
  caminho: string;
  
  constructor(
    protected injector: Injector,
    protected prontuarioService: ProntuarioService,
    private store: Store<fromProntuario.AppState>
  ) {
    super(injector);
    this.selectedRow.subscribe((res) => {      
    });
  }

  ngOnInit() {
    const customer$: Observable<Prontuario> = this.store.select(
      fromProntuario.getCurrentProntuario
    )

    customer$.subscribe(currentCustomer => {
      if (currentCustomer) {
        console.log(currentCustomer)
        /*this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id
        });
        */
      }
    })

    this.concatenatedPath = 'acolhimento';    
   // this._id != undefined ? (this.isLinear = false) : (this.isLinear = true);
  }

  identificacao(formGroup: FormGroup): void {
    this.identificacaoForm = formGroup;
  }

  historicoPsiquico(formGroup: FormGroup): void {
    this.historicoPsiquicoForm = formGroup;
  }
  responsavel(formGroup: FormGroup): void {
    this.responsavelForm = formGroup;
    this.responsavelForm.valueChanges.subscribe(() => {
      this.formChange.emit(true);
    });    
    // this.formChange.emit(true);
    //this.responsavelForm.patchValue({}, { emitEvent: false, onlySelf: true });
  }
  historicoFamiliarSocial(formGroup: FormGroup): void {
    this.historicoFamiliarSocialForm = formGroup;
  }
  historicoForense(formGroup: FormGroup): void {
    this.historicoForenseForm = formGroup;
    this.historicoForenseForm.valueChanges.subscribe(() => {
      this.formChange.emit(true);
    });
  }
  tratamento(formGroup: FormGroup): void {
    this.tratamentoForm = formGroup;
  }
  quadroClinico(formGroup: FormGroup): void {
    this.quadroClinicoForm = formGroup;
  }
  
  criado(doc) {
    this._id = doc._id;
    this.isLinear = false;
  }
 
}
