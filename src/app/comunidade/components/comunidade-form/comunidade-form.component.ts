import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComunidadeService } from '../../services/comunidade.service';

@Component({
  selector: 'app-comunidade-form',
  templateUrl: './comunidade-form.component.html',
  styleUrls: ['./comunidade-form.component.css'],
})
export class ComunidadeFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private comunidadeService: ComunidadeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cnpj: [''],
      fundacao: [''],
      razaoSocial: [''],
      presidente: [''],
      vicePresidente: [''],
      fantasia: [''],
      endereco: [''],
      localizacao: [''],
      telefone: [''],
      email: [''],
      responsavelTecnico:[''],
      correspondencia: this.fb.group({
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
        cidade: '',
        uf: '',
      }),
    });

    this.comunidadeService.read().subscribe((res) => {
      this.form.patchValue(res);
    });
  }
  save() {
    this.comunidadeService.save(this.form.value).subscribe();
  }
}
