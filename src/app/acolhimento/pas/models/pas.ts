export interface Pas {
  //acolhido: Acolhido;
  identificacao: Identificacao;
  medicamento: Medicamento[];
  doenca: Doenca[];
  responsavel: Responsavel;
  pertence: Pertence[];
  historicoQuimico: HistoricoQuimico[];
  historicoPsiquico: HistoricoPsiquico;
}
export class Identificacao {
  acolhido: Acolhido;
}
export class Presenca {
  constructor(
    public id?: number,
    public nome?: string,
    public cidade?: string
  ) {}
  static fromJson(jsonData: any): Presenca {
    return Object.assign(new Presenca(jsonData.id), jsonData);
  }
}

export interface Acolhido {
  _id: string;
  pessoal: Pessoal;
  nome: string;
  doenca: Doenca;
  medicamento: Medicamento[];
  biometria: Biometria;
  psicoterapia: Psicoterapia;
  comportamento: Comportamento;
  acolhimento: Acolhimento;
  perfil: Perfil;
  endereco: Endereco;
  avaliacao: Avaliacao;
  pertence: Pertence;
  responsavel: Responsavel;
  quadroClinico: QuadroClinico;
  saida: Saida;
  familia: Familia;

  //substancias = new SuResponsavelbstancia;
}

export interface Naturalidade {
  municipio: string;
  uf: string;
}
interface Familia {
  nFilhos: string;
  nomeEsposa: string;
}

export class Saida {
  dataSaida: Date;
  dataRetorno: Date;
  motivo: string;
}
class QuadroClinico {
  // substancia = new Substancia;
  linhaEvolutiva: string;
  abstinencia: Array<boolean>;
  tentativa: boolean;
  tentativaRelato: string;
  familia: boolean;
  observacoes: string;
}
export class Avaliacao {
  _id: string;
  data: string;
  disciplina = new Disciplina();
  autoestima = new Autoestima();
  reunioes = new Reunioes();
  espiritualidade = new Espiritualidade();
  higiene = new Higiene();
  criatividade = new Criatividade();
}

class Disciplina {
  _id: string = '';
}

class Autoestima {
  _id: string = '';
}
class Reunioes {
  _id: string = '';
}
class Espiritualidade {
  _id: string = '';
}
class Higiene {
  _id: string = '';
}
class Criatividade {
  _id: string = '';
}

export interface Pertence {
  _id: string;
  descricao: string;
  quantidade: string;
}

interface Endereco {
  uf: string;
  municipio: string;
  bairro: string;
  rua: string;
  numero: string;
}
interface Pessoal {
  nome: string;
  cpf: string;
  rg: string;
  dataNasc: string;
  cor: string;
  acolhidoImage: string;
  tpsanguineo: string;
  naturalidade: Naturalidade;
  telefone: string;
  tituloEleitor: string;
  carteiratrabalho: string;
  mae: string;
  pai: string;
  profissao: string;
  escolaridade: string;
  religiao: string;
  estadoCivil: string;
}

export interface Doenca {
  _id: string;
  codigo: string;
  nome: string;
  doenca: Doenca2;
}

interface Doenca2 {
  _id: string;
  codigo: string;
  nome: string;
}

export interface Medicamento {
  _id: string;
  posologia: string;
  observacoes: string;
  medicamento: Medicamento2;
}

export class Medicamento2 {
  _id: string;
  PRODUTO: string = '';
  APRESENTACAO: string = '';
  medicamento: string;
}

export class Biometria {
  _id: string;
  pa: string;
  altura: string;
  peso: string;
  glicemia: string;
  data: string;
}
export class Psicoterapia {
  _id: string;
  observacoes: string;
  data: string;
}

export class Comportamento {
  _id: string;
  data: string;
  observacoes: string;
  conceito = new Conceito();
}

export class Conceito {
  _id: string;
  conceito: string;
  descricao: string;
}

export class Acolhimento {
  _id: string = null;
  dataI: string = null;
  dataF: string = null;
  observacoes: string = null;
  motivo: string = null;
  convenio = new Convenio();
  periodo: string = '';
  //  substancias = new Array<Substancia>();
  responsavel = new Responsavel();
}
export class Convenio {
  _id: string = null;
}
export class Perfil {
  gostaNome: boolean = true;
  sonho: string;
  familia: string;
  mora: string;
  cor: string;
  musica: string;
}

export interface HistoricoQuimico {
  /*_id: string = null;
    nome: string = null;
    checked: boolean = false;*/
  idade: string;
  substancia: Substancia;
  diario: boolean;
}

interface Substancia {
  nome: string;
}

class Responsavel {
  nome: string = '';
  rg: string = '';
  cpf: string = '';
  telefone: string = '';
}

export interface HistoricoPsiquico {
  higienePessoal: string;
  vestimenta: string;
  postura: string;
  consciencia: string;
  atencao: string;
  memoria: string;
  pensamento: string;
  linguagem: string;
  afeto: string;
  humor: string;
  psicomotricidade: string;
  sensopercepcao: string;
}

export interface HistoricoForense {
  _id: string;
}
