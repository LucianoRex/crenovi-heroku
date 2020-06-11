import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { AcolhimentoResource } from '../../classes/acolhimento-resource';
import { RotinaDiariaFormComponent } from '../rotina-diaria-form/rotina-diaria-form.component';

@Component({
  selector: 'app-rotina-diaria-list',
  templateUrl: './rotina-diaria-list.component.html',
  styleUrls: ['./rotina-diaria-list.component.css'],
})
export class RotinaDiariaListComponent extends AcolhimentoResource
  implements OnInit {
  @ViewChild('table') table: TemplateRef<any>;

  lista;
  segunda;
  terca;
  quarta;
  quinta;
  sexta;
  sabado;
  domingo;

  diaSemana: any[] = [
    {
      key: 'Segunda',
      value: 'Segunda-Feira',
    },
    {
      key: 'Terça',
      value: 'Terça-Feira',
    },
    {
      key: 'Quarta',
      value: 'Quarta-Feira',
    },
    {
      key: 'Quinta',
      value: 'Quinta-Feira',
    },
    {
      key: 'Sexta',
      value: 'Sexta-Feira',
    },
    {
      key: 'Sábado',
      value: 'Sábado',
    },
    {
      key: 'Domingo',
      value: 'Domingo',
    },
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    console.log(this.lista);
    let columns = [
      {
        name: 'horarioInicial',
        label: 'Hora Inicial',
        type: 'time',
      },

      {
        name: 'horarioFinal',
        label: 'Hora Final',
        type: 'time',
      },
      {
        name: 'atividade',
        label: 'Atividade',
      },
      {
        name: 'diaSemana',
        label: 'Dia da Semana',
      },
    ];
    this.montaTabela({
      columns,
      service: this.acolhimentoService.read('rotinadiaria'),
      component: RotinaDiariaFormComponent,
      _id: undefined,
      socketioPath: 'rotinadiaria',
      // caminho: 'acolhimento',
    });
  }

  tabela() {
    this.acolhimentoService
      .read('rotinadiaria')
      .subscribe((res: Array<any>) => {
        this.segunda = res
          .filter((e) => e.diaSemana.includes('Segunda'))
          .map((e) => {
            return {
              Inicio:
                e.horarioInicial.substring(0, 2) +
                ':' +
                e.horarioInicial.substring(2),
              Final:
                e.horarioFinal.substring(0, 2) +
                ':' +
                e.horarioFinal.substring(2),
              Atividade: e.atividade,
            };
          })
          .sort((a, b) => (a.Inicio > b.Inicio ? 1 : -1));
        this.terca = res
          .filter((e) => e.diaSemana.includes('Terça'))
          .map((e) => {
            return {
              Inicio:
                e.horarioInicial.substring(0, 2) +
                ':' +
                e.horarioInicial.substring(2),
              Final:
                e.horarioFinal.substring(0, 2) +
                ':' +
                e.horarioFinal.substring(2),
              Atividade: e.atividade,
            };
          })
          .sort((a, b) => (a.Inicio > b.Inicio ? 1 : -1));
        this.quarta = res
          .filter((e) => e.diaSemana.includes('Quarta'))
          .map((e) => {
            return {
              Inicio:
                e.horarioInicial.substring(0, 2) +
                ':' +
                e.horarioInicial.substring(2),
              Final:
                e.horarioFinal.substring(0, 2) +
                ':' +
                e.horarioFinal.substring(2),
              Atividade: e.atividade,
            };
          })
          .sort((a, b) => (a.Inicio > b.Inicio ? 1 : -1));
        this.quinta = res
          .filter((e) => e.diaSemana.includes('Quinta'))
          .map((e) => {
            return {
              Inicio:
                e.horarioInicial.substring(0, 2) +
                ':' +
                e.horarioInicial.substring(2),
              Final:
                e.horarioFinal.substring(0, 2) +
                ':' +
                e.horarioFinal.substring(2),
              Atividade: e.atividade,
            };
          })
          .sort((a, b) => (a.Inicio > b.Inicio ? 1 : -1));
        this.sexta = res
          .filter((e) => e.diaSemana.includes('Sexta'))
          .map((e) => {
            return {
              Inicio:
                e.horarioInicial.substring(0, 2) +
                ':' +
                e.horarioInicial.substring(2),
              Final:
                e.horarioFinal.substring(0, 2) +
                ':' +
                e.horarioFinal.substring(2),
              Atividade: e.atividade,
            };
          })
          .sort((a, b) => (a.Inicio > b.Inicio ? 1 : -1));
        this.sabado = res
          .filter((e) => e.diaSemana.includes('Sábado'))
          .map((e) => {
            return {
              Inicio:
                e.horarioInicial.substring(0, 2) +
                ':' +
                e.horarioInicial.substring(2),
              Final:
                e.horarioFinal.substring(0, 2) +
                ':' +
                e.horarioFinal.substring(2),
              Atividade: e.atividade,
            };
          })
          .sort((a, b) => (a.Inicio > b.Inicio ? 1 : -1));
        this.domingo = res
          .filter((e) => e.diaSemana.includes('Domingo'))
          .map((e) => {
            return {
              Inicio:
                e.horarioInicial.substring(0, 2) +
                ':' +
                e.horarioInicial.substring(2),
              Final:
                e.horarioFinal.substring(0, 2) +
                ':' +
                e.horarioFinal.substring(2),
              Atividade: e.atividade,
            };
          })
          .sort((a, b) => (a.Inicio > b.Inicio ? 1 : -1));
        this.dialog.open(this.table, {
          maxWidth: '90vw',
          maxHeight: '70vh',
        });
      });
  }

  imprimir(e: Event) {
    let popupWinindow;
    let innerContents = document.getElementById('table');
    let n = window.open(
      '',
      '_blank',
      'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
    );
    //popupWinindow.document.open();
    n.document.body.append(innerContents);
    n.print();
    popupWinindow.document.close();
    //   e.stopPropagation();
    //  e.preventDefault();
    // e.stopImmediatePropagation();
    //  var divToPrint = document.getElementById('table');
    // let newWin = window.open('about:blank');
    //  console.log(divToPrint);
    /*divToPrint.querySelectorAll('td').forEach((e) => {
      return (e.style.border = 'solid red 1px');
    });
    divToPrint.querySelectorAll('th').forEach((e) => {
      return (e.style.border = 'solid red 1px');
    });*/
    // let j = JSON.parse(JSON.stringify(divToPrint));
    //  newWin.document.body.appendChild(j);
    //  newWin.print();
  }
}
