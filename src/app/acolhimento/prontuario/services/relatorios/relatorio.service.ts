import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { newArray } from '@angular/compiler/src/util';
import { Pas } from '../../models/pas';
import { Relatorio } from '../../models/relatorio';

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
    let user;

    this.authenticationService.currentUser.subscribe((res) => {
      user = res;
    });
    this.http
      .get(`${this.apiBaseUrl}/prontuario/relatorio/${_id}`)
      .subscribe((prontuario: Pas) => {
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
                    text: `_________________________________\n\n ${prontuario.identificacao.acolhido.nome}`,
                    alignment: 'center',
                    fontSize: 14,
                  },
                  {
                    text: `__________________________________\n\n${
                      user.colaborador.nome || 'Funcionário'
                    } ${user.colaborador.funcao || ''}`,
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
                `Neste ato, eu, ${prontuario.identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, portador da Cédula de Identidade nº ${
                    prontuario.identificacao.acolhido.rg
                  }, inscrito no CPF sob nº ${
                  prontuario.identificacao.acolhido.cpf
                } `,
                { text: 'AUTORIZO', fontSize: 15, bold: true },
                ` o uso de minha imagem em todo e qualquer material entre fotos e documentos, para ser utilizadas em divulgação, e outros movimentos da entidade Centro de Reabilitação Nova Vida-CRENOVI. Por  ser a expressão da minha vontade declaro e autorizo o uso acima descrito sem que nada haja a ser reclamado a título de direitos conexos à minha imagem ou a qualquer outro, e assino a presente autorização.
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
      .get(`${this.apiBaseUrl}/prontuario/relatorio/${_id}`)
      .subscribe((prontuario: Pas) => {
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
                `Neste ato, eu, ${prontuario.identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, voluntariamente aceito acolhimento , e concordo com as normas de convivência constantes no Regimento Interno do Centro de Reabilitação Nova Vida, e comprometo-me a cumprir o estabelecido durante o período de tratamento de 09 nove meses e máxima de 12 meses em regime de residência, podendo, em caso de descumprimento do mesmo, ser desligado do serviço. Resolução CONAD 01/2015 – RDC 29/2011.
              `,
              ],
              fontSize: 14,
              alignment: 'justify',
              margin: [0, 0, 0, 30],
            },
            {
              text: `__________________________________\n\n${prontuario.identificacao.acolhido.nome} - Acolhido`,
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
              text: `__________________________________\n\n${prontuario.responsavel.nome} -  Responsável pelo acolhido`,
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

  declaracaoPertence(_id: string) {
    this.http
      .get(`${this.apiBaseUrl}/prontuario/declaracaopertence/${_id}`)
      .subscribe((prontuario: Pas) => {
        let user;

        this.authenticationService.currentUser.subscribe((res) => {
          user = res;
        });
        let pertence: any[] = prontuario.pertence;
        let listaPertence: any[] = [];
        listaPertence.push(['ITEM', 'QUANTIDADE']);
        pertence.forEach((e) => {
          listaPertence.push([e.item, e.quantidade]);
        });
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
                    text: `_________________________________\n\n\ ${prontuario.identificacao.acolhido.nome}`,
                    alignment: 'center',
                    fontSize: 14,
                  },
                  {
                    text: `__________________________________\n\n${
                      user.colaborador.nome || 'Funcionário'
                    } 
                    \n
                    ${user.colaborador.funcao || ''}`,
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
            new new Relatorio().titulo('Declaração de pertences'),
            {
              text: [
                `Neste ato, eu, ${prontuario.identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, declaro para os devidos fins, que no presente momento de ingresso ao CENTRO DE REABILITAÇÃO NOVA VIDA, possuo os seguintes pertences:`,
              ],
              fontSize: 14,
              alignment: 'justify',
              margin: [0, 0, 0, 30],
            },
            {
              table: {
                body: listaPertence,
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
  }

  termoResponsabilidade(_id: string) {
    let user;

    this.authenticationService.currentUser.subscribe((res) => {
      user = res;
    });
    this.http
      .get(`${this.apiBaseUrl}/prontuario/relatorio/${_id}`)
      .subscribe((prontuario: Pas) => {
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
                    text: `__________________________________\n\n${
                      user.colaborador.nome || 'Funcionário'
                    } ${user.colaborador.funcao || ''}`,
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
                `Eu, ${prontuario.responsavel.nome
                  .trim()
                  .toLocaleUpperCase()}, portador(a) do CPF Nº ${prontuario.responsavel.cpf.trim()} e do RG Nº ${prontuario.responsavel.rg.trim()}, por meio deste instrumento declaro me responsabilizar pelo acolhido ${prontuario.identificacao.acolhido.nome
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
    let comunidade;

    this.authenticationService.currentUser.subscribe((res) => {
      //  console.log(res);
      user = res;
    });

    this.authenticationService.comunidade.subscribe(
      (res) => (comunidade = res)
    );
    this.http
      .get(`${this.apiBaseUrl}/prontuario/relatorio/${_id}`)
      .subscribe((prontuario: Pas) => {
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
                  `CEP: ${form[3].value.slice(0, 5)}-${form[3].value.slice(5)}`,
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
                `Declaramos para os devidos fins, que o acolhido Sr. ${prontuario.identificacao.acolhido.nome
                  .trim()
                  .toLocaleUpperCase()}, nascido em ${new DatePipe(
                  'en-US'
                ).transform(
                  prontuario.identificacao.acolhido.dataNasc,
                  'dd/MM/yyyy'
                )} portador do CPF Nº ${prontuario.identificacao.acolhido.cpf.trim()} e do RG Nº ${prontuario.identificacao.acolhido.rg.trim()}, natural de ${
                  prontuario.identificacao.acolhido.naturalidade.municipio
                }-${
                  prontuario.identificacao.acolhido.naturalidade.uf
                } encontra-se acolhido na Comunidade Terapêutica Centro de Reabilitação Nova Vida, CNPJ 02.084.777, endereço Rincão Santo Cristo s/n interior Santa Rosa-RS desde
                 ${new DatePipe('en-US').transform(
                   prontuario.identificacao.dataIngresso,
                   'dd/MM/yyyy'
                 )}, para tratamento terapêutico de substâncias psicoativas (álcool e outras drogas), contemplando um período de ${
                  prontuario.identificacao.periodo
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
              text: `${comunidade.correspondencia.rua}, n° ${comunidade.correspondencia.numero}`,
              alignment: 'justify',
            },
            {
              text: `${comunidade.correspondencia.bairro} ${comunidade.correspondencia.cidade}-${comunidade.correspondencia.uf}`,
              alignment: 'justify',
            },
            {
              text: `${comunidade.correspondencia.cep}\n`,
              alignment: 'justify',
            },
            {
              text: `Responsável Técnico: ${comunidade.responsavelTecnico}\n\n`,
              alignment: 'justify',
            },

            { text: `Santa Rosa, ${texto}\n\n`, alignment: 'justify' },
            {
              text: user.colaborador.nome || 'Funcionário',
              alignment: 'justify',
            },
            {
              text: user.colaborador.funcao || '',
              alignment: 'justify',
            },

            //  { text: `${JSON.parse(localStorage.getItem('currentUser')).colaborador.nome || 'Funcionário'} - ${JSON.parse(localStorage.getItem('currentUser')).colaborador.funcao || ''}`, alignment: 'justify' },
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
    let user;
    this.authenticationService.currentUser.subscribe((res) => {      
      user = res;
    });

    this.http
      .post(`${this.apiBaseUrl}/${_id}/relatorio`, form)
      .subscribe((relatorio: any) => {
        let acolhido = relatorio[0]._id['acolhido'];
        let identificacao = relatorio[0]._id['identificacao'];
        let procedimentos = relatorio[0]._id['procedimentos'];
        let consultas = relatorio[0]._id['consultas'];
        let procedimentosLista: string = '';
        procedimentos.forEach((e) => {
          procedimentosLista += `(X)${e}\t`;
        });

        let counts2 = [];
        consultas.forEach(function (x) {
          counts2[x] = (counts2[x] || 0) + 1;
        });
        let consultas3 = '';
        for (let a of Object.entries(counts2)) {
          consultas3 += a[0] + ':' + a[1] + '\t';
        }

        let avaliacoes = relatorio[0]._id['avaliacoes'];       
        const texto = this.formatarData();
        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [20, 20, 20, 120],
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
                    text: `__________________________________\n${
                      user.colaborador.nome || ''
                    } - ${user.colaborador.funcao || ''}`,
                    alignment: 'center',
                    fontSize: 14,
                  },
                ],
                margin: [0, 0, 0, 50],
              },
            ];
          },

          content: [
            new new Relatorio().logo(555, 'center', 100).image,
            new new Relatorio().titulo('Evolução Psicológica'),
            {
              text: `\Identificação:\n`,
              bold: true,
            },
            {
              text: `Autor/Relator: ${user.colaborador.nome || ''} - ${
                user.colaborador.funcao || ''
              }`,
            },
            {
              text: `Acolhido: ${acolhido.nome}`,
            },
            {
              text: ` Data Nasc.: ${new DatePipe('en-US').transform(
                acolhido.dataNasc,
                'dd/MM/yyyy'
              )}`,
            },
            {
              text: `Convênio: ${identificacao.convenio}`,
            },
            {
              text: `Período do acolhimento: ${identificacao.periodo} meses`,
            },
            {
              text: `Data de Ingresso: ${new DatePipe('en-US').transform(
                identificacao.dataIngresso,
                'dd/MM/yyyy'
              )}`,
            },
            {
              text: `Período  da avaliação: ${new DatePipe('en-US').transform(
                form.dataI,
                'dd/MM/yyyy'
              )} a ${new DatePipe('en-US').transform(
                form.dataF,
                'dd/MM/yyyy'
              )}\n`,
            },
            {
              text: `\nProcedimento(s) técnicos realizado(s) no período:\n`,
              bold: true,
            },
            procedimentosLista,
            /*
            {
              alignment: 'left',
              procedimentosArray
              columns: [
                {
                  text: `(${
                    n.indexOf('aplicação teste psicológico') != -1 ? 'X' : '  '
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
                    n.indexOf('entrevista com o responsável') != -1 ? 'X' : '  '
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
            */
            {
              text: `\nAnálise do período:`,
              bold: true,
            },
            {
              text: `Consultas:\n`,
            },
            // Object.entries(counts2).toString(),
            consultas3,
            '\n',
            {
              style: 'tableExample',

              table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*', '*', '*'],
                body: [
                  [
                    {
                      text: 'Avaliação do período',
                      colSpan: 6,
                      alignment: 'center',
                    },
                    {},
                    {},
                    {},
                    {},
                    {},
                  ],
                  [
                    'Autoestima',
                    'Disciplina',
                    'Higiene',
                    'Espiritualidade',
                    'Reuniões',
                    'Criatividade',
                  ],
                  [
                    avaliacoes.autoestima,
                    avaliacoes.disciplina,
                    avaliacoes.higiene,
                    avaliacoes.espiritualidade,
                    avaliacoes.reunioes,
                    avaliacoes.criatividade,
                  ],
                ],
              },
            },
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

    /*  this.http
      .get(`${this.apiBaseUrl}/${_id}/acolhido`)
      .subscribe((acolhido: any) => {
        let ac = acolhido.identificacao.acolhido.nome;
        this.http
          .post(`${this.apiBaseUrl}/${_id}/procedimentos`, form)
          .subscribe((acolhimento: any) => {
            console.log(acolhimento);
            let procedimentos = [];
            acolhimento[0]._id.procedimentos
              ? (procedimentos = acolhimento[0]._id.procedimentos)
              : (procedimentos = []);
            let procedimentos2: [] = [];
            procedimentos.forEach((e: []) => {
              procedimentos2.push(...e);
            });
            let counts = [];
           
            let n: any[] = [...new Set([...procedimentos2])];
            console.log(n);

            let consultas = [];
            let consultas2 = [];
            acolhimento[0]._id.consultas
              ? (consultas = acolhimento[0]._id.consultas)
              : (consultas = []);
            console.log(consultas);
            consultas.forEach((e: any) => {
              consultas2.push(e);
            });

            let n2 = consultas2.map((e: any) => e.tipo);
            console.log(n2);
            let counts2 = [];
            n2.forEach(function (x) {
              counts2[x] = (counts2[x] || 0) + 1;
            });
            let consultas3 = '';
            for (let a of Object.entries(counts2)) {
              consultas3 += a[0] + ':' + a[1] + '\n';
            }

            let avaliacoes = acolhimento[0]._id.avaliacoes;
            console.log(avaliacoes);

            const texto = this.formatarData();
            const documentDefinition = {
              pageSize: 'A4',
              pageOrientation: 'portrait',
              pageMargins: [20, 20, 20, 120],
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
                        text: `__________________________________\n${
                          user.colaborador.nome || ''
                        } - Psicóloga`,
                        alignment: 'center',
                        fontSize: 14,
                      },
                    ],
                    margin: [0, 0, 0, 50],
                  },
                ];
              },

              content: [
                new new Relatorio().logo(555, 'center', 100).image,
                new new Relatorio().titulo('Evolução Psicológica'),

                {
                  text: `Acolhido: ${ac}\n`,
                },
                {
                  text: `Convênio: ${acolhido.identificacao.convenio}`,
                },
                {
                  text: `Período: ${acolhido.identificacao.periodo} meses`,
                },
                {
                  text: `Data de Ingresso: ${new DatePipe('en-US').transform(
                    acolhido.identificacao.dataIngresso,
                    'dd/MM/yyyy'
                  )}`,
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
                consultas3,
                '\n',
                {
                  style: 'tableExample',

                  table: {
                    headerRows: 1,
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                      [
                        {
                          text: 'Avaliação do período',
                          colSpan: 6,
                          alignment: 'center',
                        },
                        {},
                        {},
                        {},
                        {},
                        {},
                      ],
                      [
                        'Autoestima',
                        'Disciplina',
                        'Higiene',
                        'Espiritualidade',
                        'Reuniões',
                        'Criatividade',
                      ],
                      [
                        avaliacoes.autoestima,
                        avaliacoes.disciplina,
                        avaliacoes.higiene,
                        avaliacoes.espiritualidade,
                        avaliacoes.reunioes,
                        avaliacoes.criatividade,
                      ],
                    ],
                  },
                },
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
      */
  }
  medicamentoNome(medicamentos: Array<any>): Array<any> {
    let nome = [];
    let matrix = [];
    let tabela = [];

    //   nome = medicamentos.map((e) => e.medicamento.PRODUTO);
    for (let i = 0, k = -1; i < medicamentos.length; i++) {
      if (i == 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(medicamentos[i].medicamento.PRODUTO.slice(0, 10), [
        {
          table: {
            body: this.gerarDias(),
          },
          pageBreak: 'after',
        },
      ]);
      nome.push([
        medicamentos[i].medicamento.PRODUTO.slice(0, 10),
        [
          {
            table: {
              body: this.gerarDias(),
            },
          },
        ],
      ]);
    }

    /*nome.push(	[
            'or a nested table',
            {
              table: {
                body: [
                  ['Col1', 'Col2', 'Col3'],
                  ['1', '2', '3'],
                  ['1', '2', '3']
                ]
              },
            }
          ],)*/    
    return nome;
  }
  gerarDias(): Array<any> {
    let dias: any[] = [];
    for (let i = 1; i <= 31; i++) {
      dias.push([i, 'M', 'T', 'N']);
    }
    return dias;
  }
  medicamentos(medicamentos: Array<any>): Array<any> {
    return [
      {
        table: {
          body: [this.medicamentoNome(medicamentos)],
        },
      },
    ];

    let dias: any[] = [];
    //dias.push(['DIA','M','T','N']);
    for (let i = 1; i <= 31; i++) {
      dias.push([i, 'M', 'T', 'N']);
    }
    return dias;
  }

  geraTabelaMedicamento(medicamentos: Array<any>): Array<any> {
    let lista = [];
    let lista2 = [];
    let newArr = [];

    for (let i = 0; i < medicamentos.length; i++) {
      lista2.push(medicamentos[i]);
    }
    while (lista2.length) {
      newArr.push(lista2.splice(0, 6));
    }
    for (let i = 0; i < newArr.length; i++) {
      lista.push(this.medicamentos(newArr[i]));
    }
    return lista;
  }

  medicamento(_id: string): void {
    let user;
    this.authenticationService.currentUser.subscribe((res) => {
      user = res;
    });

    this.http
      .get(`${this.apiBaseUrl}/acolhimento/${_id}/medicamento`)
      .subscribe((medicamentos: Array<any>) => {
        const texto = this.formatarData();
        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          pageMargins: [20, 20, 20, 120],

          content: [
            // new new Relatorio().logo(555, 'center', 100).image,
            new new Relatorio().titulo('medicamentos'),
            this.geraTabelaMedicamento(medicamentos),
          ],
        };
        pdfMake.createPdf(documentDefinition).open();
      });
  }

  medicamento2(_id: string): void {
    let user;
    this.authenticationService.currentUser.subscribe((res) => {
      user = res;
    });

    this.http
      .get(`${this.apiBaseUrl}/acolhimento/${_id}/medicamento`)
      .subscribe((medicamentos: Array<any>) => {
        const texto = this.formatarData();
        const documentDefinition = {
          pageSize: 'A4',
          pageOrientation: 'landscape',
          pageMargins: [20, 20, 20, 120],

          content: [
            // new new Relatorio().logo(555, 'center', 100).image,
            new new Relatorio().titulo('medicamentos'),
            //this.gdias2(),
            this.geraListaMedicamentos(medicamentos),
          ],
        };
        pdfMake.createPdf(documentDefinition).open();
      });
  }
  geraCabecalho(medicamentos: Array<any>): Array<any> {
    let tabela = [];
    let med = [];
    let cabecalho: any[] = [
      'Medicamento',
      'Dosagem',
      'Intervalo',
      'Qtde Dias',
      'Horário',
    ];
    let dias: any[] = [];
    for (let i = 1; i < 31; i++) {
      cabecalho.push(i);
    }
    //  cabecalho.push([this.geratabela(medicamentos)]);
    console.log(cabecalho);
    return cabecalho;
  }

  geratabela(medicamentos) {
    return [
      {
        style: 'tableExample',
        table: {
          body: this.geraListaMedicamentos(medicamentos),
          // this.geraListaMedicamentos(medicamentos)
        },
      },
    ];
  }
  geraListaMedicamentos(medicamentos) {
    let arr = [];
    let arr2 = [];
    let array3 = ['u', 'yu', 'oi'];

    for (let i = 0; i < medicamentos.length; i++) {
      arr.push([
        {
          table: {
            body: [this.gdias2(), this.gdias(medicamentos[i])],
          },
        },
      ]);
    }
    console.log(arr2);

    return arr;
  }
  gdias(medicamento) {
    let arr = [];
    let arr2 = [];
    for (let i = 0; i < 30; i++) {
      arr.push([
        { border: [false, false, false, false], text: 'M' },
        { border: [false, false, false, false], text: 'M' },
        { border: [false, false, false, false], text: 'M' },
      ]);
    }
    arr.push(
      {
        border: [false, false, false, false],
        text: medicamento.medicamento.PRODUTO,
      },
      {
        border: [false, false, false, false],
        text: medicamento.posologia,
      }
    );
    arr2.push();
    return arr;
  }

  gdias2() {
    let arr = [];
    let arr2 = [];
    for (let i = 0; i < 30; i++) {
      arr.push({ border: [false, false, false, false], text: i });
    }

    arr.push(
      {
        border: [false, false, false, false],
        text: 'Medicamento',
      },
      {
        border: [false, false, false, false],
        text: 'Posologia',
      }
    );
    arr2.push();
    return arr;
  }
}
