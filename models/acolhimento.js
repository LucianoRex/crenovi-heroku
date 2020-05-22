const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistoricoPsiquico = new Schema({
  higienePessoal: {
    type: String,
    alias: "Higiene Pessoal",
  },
  vestimenta: {
    type: String,
  },
  postura: {
    type: String,
  },
  consciencia: {
    type: String,
  },
  atencao: {
    type: String,
  },
  memoria: {
    type: String,
  },
  pensamento: {
    type: String,
  },
  linguagem: {
    type: String,
  },
  afeto: {
    type: String,
  },
  humor: {
    type: String,
  },
  psicomotricidade: {
    type: String,
  },
  sensopercepcao: {
    type: String,
  },
  internacaoPsiquiatrica: {
    type: Boolean,
  },
  ideiaSuicida: {
    type: Boolean,
  },
  familiar: {
    type: Boolean,
  },
  observacoes: {
    type: String,
  },
});

const HistoricoFamiliarSocial = new Schema({
  resideFamiliar: {
    type: Boolean,
    default: null,
  },
  situacaoRua: {
    type: Boolean,
    default: null,
  },
  filhos: {
    type: String,
    default: null,
  },
  estadoCivil: {
    type: String,
    default: null,
  },
  vinculoFamiliar: {
    type: String,
    default: null,
  },
  empregado: {
    type: Boolean,
    default: null,
  },
  casaPropria: {
    type: Boolean,
    default: null,
  },
  beneficio: {
    type: Boolean,
    default: null,
  },
  amigoUsuario: {
    type: Boolean,
    default: null,
  },
  lazer: {
    type: String,
    default: null,
  },
  escolaridade: {
    type: String,
    default: null,
  },
  problemaTrabalho: {
    type: String,
  },
  conjuge: {
    type: String,
  },
});

const HistoricoForense = new Schema({
  cometeuDelito: {
    type: Boolean,
  },
  foiDetido: {
    type: Boolean,
  },
  respondeProcessoJudicial: {
    type: Boolean,
  },
  motivo: {
    type: String,
  },
  observacoes: {
    type: String,
  },
});

const Saida = new Schema({
  saida: {
    type: Date,
    default: Date.now(),
  },
  retorno: {
    type: Date,
    default: Date.now(),
  },
});
let acolhimento = new Schema(
  {
    ativo: {
      type: Boolean,
      default: true,
    },
    identificacao: {
      dataIngresso: {
        type: Date,
        default: Date.now(),
      },
      dataEgresso: {
        type: Date,
      },
      encaminhado: {
        type: String,
      },
      periodo: {
        type: String,
        required: [true, "Período requerido"],
      },
      convenio: {
        type: String,
        required: [true, "Convênio requerido"],
      },
      acolhido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "acolhido",
      },
    },
    responsavel: {
      nome: {
        type: String,
      },
      cpf: {
        type: String,
        default: "",
      },
      rg: {
        type: String,
        default: "",
      },
    },
    medicamento: [
      {
        medicamento: {
          type: mongoose.Schema.Types.ObjectId,
          unique: true,
          ref: "medicamento",
        },
        posologia: {
          type: String,
          default: "Posologia",
        },
        observacoes: {
          type: String,
          default: "OBS",
        },
      },
    ],
    doenca: [
      {
        doenca: {
          type: mongoose.Schema.Types.ObjectId,
          unique: true,
          ref: "doenca",
        },
        observacoes: {
          type: String,
        },
      },
    ],
    biometria: [
      {
        peso: {
          type: String,
        },
        altura: {
          type: String,
        },
        glicemia: {
          type: String,
        },
        pa: {
          type: String,
        },
        data: {
          type: String,
          default: Date.now(),
        },
      },
    ],
    tratamento: {
      desintoxicacao: {
        type: Boolean,
      },
      reducaoDano: {
        type: Boolean,
      },
      grupoApoio: {
        type: Boolean,
      },
      ct: {
        type: Boolean,
      },
    },
    quadroClinico: {
      abstinencia: {
        tremor: {
          type: Boolean,
        },
        nausea: {
          type: Boolean,
        },
        sudorese: {
          type: Boolean,
        },
        oscilacaoHumor: {
          type: Boolean,
        },
        cefaleia: {
          type: Boolean,
        },
        caimbra: {
          type: Boolean,
        },
        diarreia: {
          type: Boolean,
        },
        irritabilidade: {
          type: Boolean,
        },
        agressividade: {
          type: Boolean,
        },
        insonia: {
          type: Boolean,
        },
        fissura: {
          type: Boolean,
        },
      },
    },

    historicoPsiquico: HistoricoPsiquico,
    historicoFamiliarSocial: HistoricoFamiliarSocial,
    historicoQuimico: [
      {
        substancia: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "substancia",
        },
        idade: {
          type: String,
        },
      },
    ],
    historicoForense: HistoricoForense,
    saida: [Saida],
  },
  {
    collection: "acolhimento",
  }
);
acolhimento.index(
  { ativo: 1, "identificacao.acolhido": 1 },
  { unique: [true, "Acolhido selecionado já está em acolhimento"] }
);
module.exports = mongoose.model("acolhimento", acolhimento);
