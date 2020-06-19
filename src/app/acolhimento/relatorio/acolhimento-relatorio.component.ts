import { Component, OnInit } from '@angular/core';
import { AcolhimentoRelatorioService } from './acolhimento-relatorio.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './acolhimento-relatorio.component.html',
  styleUrls: ['./acolhimento-relatorio.component.css'],
})
export class AcolhimentoRelatorioComponent implements OnInit {
  relatorios: any[] = [
    {
      titulo: 'Rotina diária',
      function: this.normaDiaria.bind(this),
    },
  ];
  constructor(
    private acolhimentoRelatorioService: AcolhimentoRelatorioService
  ) {}
  htmlContent: string;

  ngOnInit(): void {}

  open(relatorio) {
    relatorio();
  }

  normaDiaria() {
    this.acolhimentoRelatorioService.rotinaDiaria()
  }
}
