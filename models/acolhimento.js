const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const Avaliacao = new Schema({
  disciplina: {
    type: Number,
    default: 0,
    //     type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Conceito',
  },
  autoestima: {
    type: Number,
    default: 0,
    //    type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Conceito',
  },
  reunioes: {
    type: Number,
    default: 0,
    //   type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Conceito',
  },
  espiritualidade: {
    type: Number,
    default: 0,

    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Conceito',
  },
  higiene: {
    type: Number,
    default: 0,
    //  type: mongoose.Schema.Types.ObjectId,
    //  ref: 'Conceito',
  },
  criatividade: {
    type: Number,
    default: 0,
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Conceito',
  },
  observacoes: {
    type: String,
  },
  data: {
    type: Date,
    default: Date.now(),
    unique: true,
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
  motivo: {
    type: String,
  },
  responsavel: {
    type: String,
  },
});

const Pertence = new Schema({
  pertence: {
    type: String,
    unique: true,
  },
  quantidade: {
    type: String,
  },
});

let acolhimento = new Schema(
  {
    ativo: {
      type: Boolean,
      default: true,
    },
    motivoConclusao: {
      type: String,
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
        default: "",
      },
      cpf: {
        type: String,
        default: "",
      },
      rg: {
        type: String,
        default: "",
      },
      email: {
        type: String,
      },
      telefone: {
        type: String,
      },
    },
    avaliacao: [Avaliacao],
    medicamento: [
      {
        medicamento: {
          type: mongoose.Schema.Types.ObjectId,
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
      observacoes: {
        type: String,
      },
      cessarUso: {
        type: Boolean,
      },
      familiar: {
        type: Boolean,
      },
    },
    evolucaoPsicologica: [
      {
        dataI: {
          type: Date,
        },
        dataF: {
          type: Date,
        },
        sintese: {
          type: String,
        },
        procedimentos: {
          type: Array,
        },
      },
    ],
    agendamentoConsulta: [
      {
        data: {
          type: Date,
        },
        horario: {
          type: String,
        },
        tipo: {
          type: String,
          default: "",
        },
        local: {
          type: String,
        },
        consultaEfetuada: {
          type: Boolean,
        },
      },
    ],
    psicoterapia: [
      {
        data: {
          type: Date,
        },
        procedimento: {
          type: [String],
        },
        observacoes: {
          type: String,
        },
      },
    ],

    historicoPsiquico: {
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
    },
    historicoFamiliarSocial: {
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
    },
    historicoQuimico: [
      {
        substancia: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "substancia",
        },
        idade: {
          type: String,
        },
        diario: {
          type: Boolean,
        },
        observacoes: {
          type: String,
        },
      },
    ],
    historicoForense: {
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
    },
    saida: [Saida],
    pertence: [Pertence],
    criado: {
      usuario: {
        type: String,
      },
      data: {
        type: Date,
        default: Date.now(),
      },
    },
  },
  {
    collection: "acolhimento",
  }
);
/*acolhimento.index(
  { ativo: 1, "identificacao.acolhido": 1 },
  { unique: [true, "Acolhido selecionado já está em acolhimento"] }
);*/

/*acolhimento.pre("save", true, async function (next, done) {
  var self = this;
  
  mongoose.models["acolhimento"].findOne(
    { "acolhido.acolhido": self.acolhido, ativo: false },
    function (err, user) {
      console.log(self);
      if (err) {
        done(new Error("Erro"));
      } else if (!user) {
        done(new Error("O acolhido selecionado já está em acolhimento"));
      } else {
       done()
      }
    }
  );
  next();
});
*/
acolhimento.pre("findOneAndUpdate", true, function (next, done) {
  var self = this;
  mongoose.models["acolhimento"].findOne(
    self.getQuery(),
    { ativo: 1 },
    function (err, user) {
      console.log(self.getQuery());
      if (err) {
        done();
      } else if (user && user.ativo == false) {
        done(new Error("Acolhimento concluído, não pode ser mais alterado"));
      } else {
        done();
      }
    }
  );
  next();
});

module.exports = mongoose.model("acolhimento", acolhimento);
