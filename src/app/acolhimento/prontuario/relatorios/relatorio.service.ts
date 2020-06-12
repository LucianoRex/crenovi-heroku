import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { Pas } from '../models/pas';
import { Relatorio } from '../models/relatorio';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

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
                    text: `_________________________________\n\n ${acolhimento[0].identificacao.acolhido.nome}`,
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
            new new Relatorio().logo(500, 'center', 50).image,
            new new Relatorio().titulo('TERMO DE AUTORIZAÇÃO DE USO DE IMAGEM'),
            {
              text: [
                `Neste ato, eu, ${acolhimento[0].identificacao.acolhido.nome
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
            new new Relatorio().logo(500, 'center', 50).image,
            new new Relatorio().titulo('Termo de ciência'),
            {
              text: [
                `Neste ato, eu, ${acolhimento[0].identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, voluntariamente aceito acolhimento , e concordo com as normas de convivência constantes no Regimento Interno do Centro de Reabilitação Nova Vida, e comprometo-me a cumprir o estabelecido durante o período de tratamento de 09 nove meses e máxima de 12 meses em regime de residência, podendo, em caso de descumprimento do mesmo, ser desligado do serviço. Resolução CONAD 01/2015 – RDC 29/2011.
              `,
              ],
              fontSize: 14,
              alignment: 'justify',
              margin: [0, 0, 0, 30],
            },
            {
              text: `__________________________________\n\n${acolhimento[0].identificacao.acolhido.nome} - Acolhido`,
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
              text: `__________________________________\n\n${acolhimento[0].identificacao.acolhido.nome} -  Responsável pelo acolhido`,
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
            new new Relatorio().logo(500, 'center', 50).image,
            new new Relatorio().titulo('Termo de responsabilidade'),
            {
              text: [
                `Eu, ${acolhimento[0].responsavel.nome
                  .trim()
                  .toLocaleUpperCase()} portador(a) do CPF Nº ${acolhimento[0].responsavel.cpf.trim()} e do RG Nº ${acolhimento[0].responsavel.rg.trim()}, por meio deste instrumento declaro me responsabilizar pelo acolhido ${acolhimento[0].identificacao.acolhido.nome
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

  declaracaoHipossuficienciaDeRenda(_id: string, form: any[]) {
    let user;

    this.authenticationService.currentUser.subscribe((res) => {
    //  console.log(res);
      user = res.nome;
    });

    this.http
      .get(`${this.apiBaseUrl}/acolhimento/relatorio/${_id}`)
      .subscribe((acolhimento: Pas) => {
     //   console.log(acolhimento);
        const texto = this.formatarData();
        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [50, 50, 50, 150],
          footer: function () {
            return [
              {
                text: [
                  `A/C\n`,
                  `${form[0].value}\n`,
                  `Cidade: ${form[1].value}\n`,
                  `Endereço: ${form[2].value}\n`,
                  `CEP: ${form[3].value}`,
                ],
                margin: [50, 10, 10, 100],
                alignment: 'justify',
                fontSize: 14,
              },
            ];
          },

          content: [
            new new Relatorio().logo(500, 'center', 50).image,
            new new Relatorio().titulo(
              'Declaração de hipossuficiência de renda'
            ),
            {
              text: [
                `Declaramos para os devidos fins, que o acolhido , Sr. ${acolhimento[0].identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, nascido em ${new DatePipe(
                  'en-US'
                ).transform(
                  acolhimento[0].identificacao.acolhido.dataNasc,
                  'dd/MM/yyyy'
                )} portador do CPF Nº ${acolhimento[0].identificacao.acolhido.cpf.trim()} e do RG Nº ${acolhimento[0].identificacao.acolhido.rg.trim()}, natural de ${
                  acolhimento[0].identificacao.acolhido.naturalidade.municipio
                }-${
                  acolhimento[0].identificacao.acolhido.naturalidade.uf
                } encontra-se acolhido na Comunidade Terapêutica Centro de Reabilitação Nova Vida, CNPJ 02.084.777, endereço Rincão Santo Cristo s/n interior Santa Rosa-RS desde
                 ${new DatePipe('en-US').transform(
                   acolhimento[0].identificacao.dataIngresso,
                   'dd/MM/yyyy'
                 )}, para tratamento terapêutico de substâncias psicoativas (álcool e outras drogas), contemplando um período de ${
                  acolhimento[0].identificacao.periodo
                } meses. Declaramos nos termos da lei 13.105/2015, artigo 98, que o mesmo não possui condições financeiras para custear as despesas do documento solicitado.             
            `,
              ],

              fontSize: 14,
              alignment: 'justify',
              margin: [0, 30, 0, 0],
            },
            { text: 'Documento', style: 'header' },
            {
              text: [
                `${form[4].options[form[4].selectedIndex].text} (${
                  form[5].value
                })\n\n`,
              ],
            },
            { text: 'Enviar para:', style: 'header' },
            {
              text: `${acolhimento[1].correspondencia.rua}, n° ${acolhimento[1].correspondencia.numero}`,
              alignment: 'justify',
            },
            {
              text: `${acolhimento[1].correspondencia.bairro} ${acolhimento[1].correspondencia.cidade}-${acolhimento[1].correspondencia.uf}`,
              alignment: 'justify',
            },
            {
              text: `${acolhimento[1].correspondencia.cep}\n\n`,
              alignment: 'justify',
            },

            { text: `Santa Rosa, ${texto}\n\n`, alignment: 'justify' },
            { text: user, alignment: 'justify' },
            //  { text: user.result.colaborador.funcao.nome, alignment: 'justify' },
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

  evolucaoPsicologica(_id: string, form) {
   // console.log(_id);
    let user;
    this.authenticationService.currentUser.subscribe((res) => {
      console.log(res);
      user = res.nome;
    });

    this.http
      .get(`${this.apiBaseUrl}/${_id}/acolhido`)
      .subscribe((acolhido: any) => {
        let ac = acolhido.identificacao.acolhido.nome;
        this.http
          .post(
            `${this.apiBaseUrl}/${_id}/procedimentos`,
            form
          )
          .subscribe((acolhimento: Pas) => {
            let procedimentos = [];
            acolhimento[0]
              ? (procedimentos = acolhimento[0].procedimentos)
              : (procedimentos = []);
            console.log(procedimentos);
            let consultas = [];
            acolhimento[0]
              ? (consultas = acolhimento[0].consultas)
              : (consultas = []);
            let p: [] = [];
            let p2: [] = [];
            procedimentos.forEach((e: []) => {
              p.push(...e);
            });
            consultas.forEach((e: []) => {
              p2.push(...e);
            });
            let counts = [];
            p.forEach(function (x) {
              counts[x] = (counts[x] || 0) + 1;
            });
            console.log(counts);
            console.log([...new Set([...p])]);
            let n: any[] = [...new Set([...p][0])];
            let n2 = p2.map((e: any) => e.tipo);
            let counts2 = [];
            n2.forEach(function (x) {
              counts2[x] = (counts2[x] || 0) + 1;
            });
            const texto = this.formatarData();
            let consultas2 = '';
            for (let a of Object.entries(counts2)) {
              consultas2 += a[0] + ':' + a[1] + '\n';
            }

            const documentDefinition = {
              pageSize: 'A4',
              pageOrientation: 'portrait',
              pageMargins: [10, 10, 10, 120],
              footer: function (currentPage, pageCount) {
                return [
                  {
                    text: `Santa Rosa, ${texto}`,
                    margin: [0, 0, 0, 30],
                    alignment: 'center',
                    fontSize: 14,
                  },
                  {
                    alignment: 'justify',
                    columns: [
                      {
                        text: `__________________________________\n${user}`,
                        alignment: 'center',
                        fontSize: 14,
                      },
                    ],
                    margin: [0, 0, 0, 50],
                  },
                ];
              },

              content: [
                new new Relatorio().logo(575, 'center', 100).image,
                new new Relatorio().titulo('Evolução Psicológica'),

                {
                  text: `Acolhido: ${ac}\n`,
                },
                {
                  text: `Período: ${new DatePipe('en-US').transform(
                    form.dataI,
                    'dd/MM/yyyy'
                  )} a ${new DatePipe('en-US').transform(
                    form.dataF,
                    'dd/MM/yyyy'
                  )}\n`,
                },
                {
                  text: `\nProcedimento(s) técnicos realizado(s):\n`,
                },
                {
                  alignment: 'left',
                  columns: [
                    {
                      text: `(${
                        n.indexOf('aplicação teste psicológico') != -1
                          ? 'X'
                          : '  '
                      })aplicação teste psicológico`,
                    },
                    {
                      text: `(${
                        n.indexOf('desenhos/brincadeiras') != -1 ? 'X' : '  '
                      })desenhos/brincadeiras`,
                    },
                    {
                      text: `(${
                        n.indexOf('escuta/acolhimento') != -1 ? 'X' : '  '
                      })escuta/acolhimento`,
                    },
                  ],
                },
                {
                  alignment: 'left',
                  columns: [
                    {
                      text: `(${
                        n.indexOf('atendimento grupal') != -1 ? 'X' : '  '
                      })atendimento grupal`,
                    },
                    {
                      text: `(${
                        n.indexOf('entrevista com o responsável') != -1
                          ? 'X'
                          : '  '
                      })entrevista com o responsável`,
                    },
                    {
                      text: `(${
                        n.indexOf('devolutiva') != -1 ? 'X' : '  '
                      })devolutiva`,
                    },
                  ],
                },
                {
                  alignment: 'left',
                  columns: [
                    {
                      text: `(${
                        n.indexOf('atendimento individual') != -1 ? 'X' : '  '
                      })atendimento individual`,
                    },
                    {
                      text: `(${
                        n.indexOf('Outros') != -1 ? 'X' : '  '
                      })Outros_________________`,
                    },
                    {
                      text: `(${
                        n.indexOf('orientação profissional') != -1 ? 'X' : '  '
                      })orientação profissional`,
                    },
                  ],
                },
                {
                  text: `\nConsultas:\n`,
                },
                // Object.entries(counts2).toString(),
                consultas2,
                {
                  text: `\nSíntese da escuta:\n`,
                },
                {
                  table: {
                    heights: [150],
                    widths: ['*'],
                    body: [[form.sintese]],
                  },
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
      });
  }
}
