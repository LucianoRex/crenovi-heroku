import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Relatorio } from '../prontuario/models/relatorio';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class AcolhimentoRelatorioService {
  apiBaseUrl = environment.apiBaseUrl;
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
  segunda;
  terca;
  quarta;
  quinta;
  sexta;
  sabado;
  domingo;
  constructor(private _http: HttpClient) {}

  rotinaDiaria() {
    this._http
      .get(`${this.apiBaseUrl}/acolhimento/rotinadiaria`)
      .subscribe((res: any) => {        
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
        let segundaArr: any[] = [];
        Array.from(this.segunda).forEach((e: any) => {
          segundaArr.push([e.Atividade, [e.Inicio, e.Final]]);
        });
        let tercaArr: any[] = [];
        Array.from(this.terca).forEach((e: any) => {
          tercaArr.push([e.Atividade, [e.Inicio, e.Final]]);
        });
        let quartaArr: any[] = [];
        Array.from(this.quarta).forEach((e: any) => {
          quartaArr.push([e.Atividade, [e.Inicio, e.Final]]);
        });
        let quintaArr: any[] = [];
        Array.from(this.quinta).forEach((e: any) => {
          quintaArr.push([e.Atividade, [e.Inicio, e.Final]]);
        });
        let sextaArr: any[] = [];
        Array.from(this.sexta).forEach((e: any) => {
          sextaArr.push([e.Atividade, [e.Inicio, e.Final]]);
        });
        let sabadoArr: any[] = [];
        Array.from(this.sabado).forEach((e: any) => {
          sabadoArr.push([e.Atividade, [e.Inicio, e.Final]]);
        });
        let domingoArr: any[] = [];
        Array.from(this.domingo).forEach((e: any) => {
          domingoArr.push([e.Atividade, [e.Inicio, e.Final]]);
        });               
        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'landscape',
          pageMargins: [20, 20, 20, 20],

          content: [
            new new Relatorio().logo(800, 'center', 50).image,
            new new Relatorio().titulo('Rotina diária'),
            {
              style: 'tableExample',
              fontSize: 10,
              defaultBorder: false,
              table: {
                widths: ['*', '*', '*', '*', '*', '*', '*'],
                body: [
                  [
                    'Segunda-Feira',
                    'Terça-Feira',
                    'Quarta-Feira',
                    'Quinta-Feira',
                    'Sexta-Feira',
                    'Sábado',
                    'Domingo',
                  ],

                  [
                    [
                      {
                        table: {
                          body: segundaArr,
                        },
                        layout: 'noBorders',
                      },
                    ],
                    [
                      {
                        table: {
                          body: tercaArr,
                        },
                        layout: 'noBorders',
                      },
                    ],
                    [
                      {
                        table: {
                          body: quartaArr,
                        },
                        layout: 'noBorders',
                      },
                    ],
                    [
                      {
                        table: {
                          body: quintaArr,
                        },
                        layout: 'noBorders',
                      },
                    ],
                    [
                      {
                        table: {
                          body: sextaArr,
                        },
                        layout: 'noBorders',
                      },
                    ],
                    [
                      {
                        table: {
                          body: sabadoArr,
                        },
                        layout: 'noBorders',
                      },
                    ],
                    [
                      {
                        table: {
                          body: domingoArr,
                        },
                        layout: 'noBorders',
                      },
                    ],
                  ],
                ],
              },
           //   layout: 'noBorders',
            },
          ],
        };
        pdfMake.createPdf(documentDefinition).open();
      });
  }
  normaComunidade() {
    this._http
      .get(`${this.apiBaseUrl}/acolhimento/norma`)
      .subscribe((res: any) => {        

        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [30, 20, 20, 30],
          content: [
            new new Relatorio().logo(545, 'center', 50).image,
            new new Relatorio().titulo('Normas'),
            {
              text: res.texto,
            },
          ],
        };
        pdfMake.createPdf(documentDefinition).open();
      });
  }
}
