import { Component, OnInit, Injector } from '@angular/core';
import { ProntuarioResource } from '../../classes/prontuario-resource';
import { Validators } from '@angular/forms';

import { RadialChartOptions, ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { RelatorioService } from '../../services/relatorios/relatorio.service';

@Component({
  selector: 'app-evolucao-psicologica-form',
  templateUrl: './evolucao-psicologica-form.component.html',
  styleUrls: ['./evolucao-psicologica-form.component.css'],
})
export class EvolucaoPsicologicaFormComponent extends ProntuarioResource
  implements OnInit {
  procedimentos;
  consultas;
  maxTextLineLength: number = 50;

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [
    'Disciplina',
    'Autoestima',
    'Reuniões',
    'Espiritualidade',
    'Higiene',
    'Criatividade',
  ];

  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
  ];
  public radarChartType: ChartType = 'radar';

  constructor(
    protected injector: Injector,
    private relatorioServie: RelatorioService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: 'evolucaoPsicologica',
      array: true,
      evolucaoPsicologica: this.fb.group(
        {
          _id: undefined,
          dataI: ['', Validators.required],
          dataF: ['', Validators.required],
          sintese: [''],
          procedimentos: [''],
        },
        {
          validators: this.comparaData('dataI', 'dataF'),
        }
      ),
    });
    this._id !== undefined
      ? this.prontuarioService
          .readById(this.concatenatedPath, this._id)
          .subscribe((res: any) => {
            this.form.get('evolucaoPsicologica').patchValue(res);
            this.carregaDadosPsicoterapia();
          })
      : null;

    this.form.statusChanges.subscribe(() => this.carregaDadosPsicoterapia());
    //this.carregaDadosPsicoterapia();
  }

  carregaDadosPsicoterapia() {
    this.prontuarioService
      .carregaDadosPsicoterapia(
        this.concatenatedPath,
        this.form.get('evolucaoPsicologica').value
      )
      .subscribe((res) => {        
        if (res[0]) {
          this.procedimentos = new Set(res[0]._id.procedimentos);
          this.consultas = new Set(res[0]._id.consultas);
          this.radarChartData = [
            {
              data: [...Object.values(res[0]._id.avaliacoes)],
              label: 'Avaliações',
            },
          ];
        } else {
          this.procedimentos = new Array();
          this.consultas = new Array();
        }

        // this.form.get('procedimentos').patchValue(this.procedimentos[0])
        /**
       *  let procedimentos = acolhimento[1][0].procedimentos;
        console.log(procedimentos);
        let p: [] = [];
        procedimentos.forEach((e: []) => {
          p.push(...e);
        });
        // p = [...new Set([...um,...dois])]
        console.log(p);
        let counts = [];
        p.forEach(function (x) {
          counts[x] = (counts[x] || 0) + 1;
        });
        console.log(counts);
        console.log([...new Set([...p])]);
        let n: any[] = [...new Set([...p])];
        console.log(n)
       */
      });
  }
  gerarRelatorio() {
    this.relatorioServie.evolucaoPsicologica(
      this.concatenatedPath,
      this.form.get('evolucaoPsicologica').value
    );
  }

  onKeyAction(control) {
    var limit = 10;
    var v = control; //var v = $(this).val();
    //var lines = v.split(/(\r\n|\n|\r)/);
    var lines = v.split('');
    var newtext = '';
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.length > limit) {
        line = line.substr(0, limit);
      }
      newtext += '\n' + line;
    }
    control = newtext;    
  }
}
