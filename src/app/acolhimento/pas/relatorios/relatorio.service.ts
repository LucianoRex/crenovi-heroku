import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { Pas } from '../models/pas';
import { Relatorio } from '../models/relatorio';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  apiBaseUrl = environment.apiBaseUrl;

  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  dias = ['domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  formatarData() {
    var mes = this.meses[new Date().getMonth()];
    return [
      new Date().getDate() +
      ' de ' /*+ mes.slice(0, 3).toLowerCase() +*/ +
        mes +
        ' de ' +
        new Date().getFullYear(),
    ].join(' ');
  }

  constructor(private http: HttpClient) {}

  usoImagem(_id: string) {
    this.http
      .get(`${this.apiBaseUrl}/acolhimento/relatorio/${_id}`)
      .subscribe((acolhimento: Pas) => {
        const texto = this.formatarData();
        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [50, 50, 50, 150],
          footer: function (currentPage, pageCount) {
            return [
              {
                text: `Santa Rosa, ${texto}`,
                margin: [0, 0, 0, 50],
                alignment: 'center',
                fontSize: 14,
              },
              {
                alignment: 'justify',
                columns: [
                  {
                    text: `_________________________________\n\n ${acolhimento.identificacao.acolhido.nome}`,
                    alignment: 'center',
                    fontSize: 14,
                  },
                  {
                    text: '__________________________________\n\nTestemunha',
                    alignment: 'center',
                    fontSize: 14,
                  },
                ],
                margin: [0, 0, 0, 100],
              },
            ];
          },
          content: [
            new Relatorio().logo,
            new new Relatorio().titulo('TERMO DE AUTORIZAÇÃO DE USO DE IMAGEM'),
            {
              text: [
                `Neste ato, eu, ${acolhimento.identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, `,
                { text: 'AUTORIZO', fontSize: 15, bold: true },
                ` o uso de minha imagem em todo e qualquer material entre fotos e documentos, para ser utilizadas em divulgação, E outros movimentos da entidade Centro de Reabilitação Nova Vida-CRENOVI. Por  ser a expressão da minha vontade declaro e autorizo o uso acima descrito sem que nada haja a ser reclamado a título de direitos conexos à minha imagem ou a qualquer outro, e assino a presente autorização.
          `,
              ],
              fontSize: 14,
              alignment: 'justify',
              margin: [0, 50, 0, 0],
            },
          ],

          styles: {
            header: {
              fontSize: 16,
              //  bold: true,
              alignment: 'justify',
            },
            tableHeader: {
              bold: true,
            },
          },
        };
        pdfMake.createPdf(documentDefinition).open();
      });
  }
  termoCiencia(_id: string) {
    this.http
      .get(`${this.apiBaseUrl}/acolhimento/relatorio/${_id}`)
      .subscribe((acolhimento: Pas) => {
        const texto = this.formatarData();
        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [50, 50, 50, 100],

          content: [
            new Relatorio().logo,
            new new Relatorio().titulo('Termo de ciência'),
            {
              text: [
                `Neste ato, eu, ${acolhimento.identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, voluntariamente aceito acolhimento , e concordo com as normas de convivência constantes no Regimento Interno do Centro de Reabilitação Nova Vida, e comprometo-me a cumprir o estabelecido durante o período de tratamento de 09 nove meses e máxima de 12 meses em regime de residência, podendo, em caso de descumprimento do mesmo, ser desligado do serviço. Resolução CONAND 01/2015 – RDC 29/2011.
              `,
              ],
              fontSize: 14,
              alignment: 'justify',
              margin: [0, 0, 0, 30],
            },
            {
              text: `__________________________________\n\n${acolhimento.identificacao.acolhido.nome} - Acolhido`,
              alignment: 'center',
              fontSize: 14,
              margin: [0, 0, 0, 70],
            },
            /* { text: 'Responsável pelo acolhido', style: 'header' },
           {
             type: 'none',
             ol: [
               `Nome: ${acolhido.responsavel.nome}`,
               `CPF: ${acolhido.responsavel.cpf}`,
               `CPF: ${acolhido.responsavel.cpf}`,
               `CPF: ${acolhido.responsavel.cpf}`,
               `CPF: ${acolhido.responsavel.cpf}`,
             ],
             margin: [0, 0, 0, 10],
             fontSize: 14,
           },*/
            {
              text: `__________________________________\n\n${acolhimento.identificacao.acolhido.nome} -  Responsável pelo acolhido`,
              alignment: 'center',
              fontSize: 14,
              margin: [0, 0, 0, 70],
            },

            /* { text: 'Responsável pelo acolhimento', style: 'header', margin: [0, 0, 0, 30], },*/

            {
              text: `__________________________________\n\nCarimbo e assinatura do funcionário`,
              alignment: 'center',
              fontSize: 14,
            },
          ],

          styles: {
            header: {
              fontSize: 16,
              bold: true,
              alignment: 'justify',
            },
            tableHeader: {
              bold: true,
            },
          },
        };
        pdfMake.createPdf(documentDefinition).open();
      });
  }
  termoResponsabilidade(_id: string) {
    this.http
      .get(`${this.apiBaseUrl}/acolhimento/relatorio/${_id}`)
      .subscribe((acolhimento: Pas) => {
        const texto = this.formatarData();
        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [50, 50, 50, 150],
          footer: function (currentPage, pageCount) {
            return [
              {
                text: `Santa Rosa, ${texto}`,
                margin: [0, 0, 0, 50],
                alignment: 'center',
                fontSize: 14,
              },
              {
                alignment: 'justify',
                columns: [
                  {
                    text: '_________________________________\n\nResponsável',
                    alignment: 'center',
                    fontSize: 14,
                  },
                  {
                    text: '__________________________________\n\nFuncionário',
                    alignment: 'center',
                    fontSize: 14,
                  },
                ],
                margin: [0, 0, 0, 100],
              },
            ];
          },
          content: [
            new Relatorio().logo,
            new new Relatorio().titulo('Termo de responsabilidade'),
            {
              text: [
                `Eu, ${acolhimento.responsavel.nome
                  .trim()
                  .toLocaleUpperCase()} portador(a) do CPF Nº ${acolhimento.responsavel.cpf.trim()} e do RG Nº ${acolhimento.responsavel.rg.trim()}, por meio deste instrumento declaro me responsabilizar pelo acolhido ${acolhimento.identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, entregue no dia ${new Date().getDate()}/${
                  new Date().getUTCMonth() + 1
                }/${new Date().getFullYear()}.
            `,
              ],
              fontSize: 14,
              alignment: 'justify',
              margin: [0, 50, 0, 0],
            },
          ],

          styles: {
            header: {
              fontSize: 16,
              bold: true,
              alignment: 'justify',
            },
            tableHeader: {
              bold: true,
            },
          },
        };
        pdfMake.createPdf(documentDefinition).open();
      });
  }
}
