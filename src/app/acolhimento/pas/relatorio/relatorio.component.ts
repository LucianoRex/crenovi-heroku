import { Component, OnInit, Input } from '@angular/core';
import { RelatorioService } from '../relatorios/relatorio.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  constructor(private relatorioService: RelatorioService) {}
  @Input() _id: string;
  ngOnInit(): void {}

  usoImagem() {
    this.relatorioService.usoImagem(this._id);
  }

  termoCiencia() {
    this.relatorioService.termoCiencia(this._id);
  }
  termoResponsabilidade() {
    this.relatorioService.termoResponsabilidade(this._id);
  }
}
