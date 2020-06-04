import {
  Component,
  OnInit,
  Input,
  SecurityContext,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RelatorioService } from '../../relatorios/relatorio.service';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  constructor(
    private relatorioService: RelatorioService,
    public dialog: MatDialog,
    private dom: DomSanitizer,
    private modalService: BsModalService
  ) {}
  htmlContent: string;
  @Input() _id: string;
  ngOnInit(): void {}
  subscription: Subscription;
  subscription2: Subscription;
  usoImagem() {
    this.relatorioService.usoImagem(this._id);
  }

  termoCiencia() {
    this.relatorioService.termoCiencia(this._id);
  }
  termoResponsabilidade() {
    this.relatorioService.termoResponsabilidade(this._id);
  }
  declaracaoHipossuficiencia() {
    const initialState = {
      title: 'Declaração de  hipossuficiência de renda',
      form: [
        `
    <form>
              <div class="form-group">
                <label for="destinatario">Destinatário</label>
                <input type="text" class="form-control" placeholder="Cartório de Registro Civil de Pessoas Naturais 2º Zona">            
              </div>
              <div class="form-group">
                <label for="">Cidade</label>
                <input type="text" class="form-control">
              </div>
              <div class="form-group">
                <label for="">Endereço</label>
                <input type="text" class="form-control">
              </div>                    
              <div class="form-group">
                <label for="">CEP</label>
                <input type="text" mask="00000-000" class="form-control">
              </div>  
              <label for="inputState">Documento</label>
              <select  class="form-control">
                <option>Certidão de Casamento</option>
                <option>Certidão de Nascimento</option>            
                <option>CPF</option>            
                <option>RG</option>            
                <option>Carteira de Trabalho</option>            
                <option>Título de Eleitor</option>            
              </select>
              <div class="form-group">
                <label for="">Informações extras do documento</label>
                <input type="text" class="form-control">
              </div>  
            </div>                  
            </form>
    `,
      ],
    };
    this.modalService.show(DialogContentExampleDialog, { initialState });
    this.subscription2 = this.modalService.onHide.subscribe((form) => {
      if (form) {
        this.relatorioService.declaracaoHipossuficienciaDeRenda(this._id, form);
      }
    });
    this.subscription = this.modalService.onHidden.subscribe(() => {
      this.subscription.unsubscribe();
      this.subscription2.unsubscribe();
    });
  }

  evolucaoPsicologica(){
    //this.relatorioService.evolucaoPsicologica(this._id,this.fo);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <strong>{{ title }}</strong>
            </div>
            <div class="card-body" #content></div>
            <div class="col-md-12">
              <button class="btn btn-primary" (click)="enviar()">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DialogContentExampleDialog {
  list: any[] = [];
  componentInput: any;
  form: any;
  title: string;
  @ViewChild('content', { static: true }) content: ElementRef;

  constructor(
    public bsModalRef: BsModalRef,
    private renderer: Renderer2,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.content.nativeElement.insertAdjacentHTML('beforeend', this.form);
  }

  enviar() {
    let form = this.content.nativeElement.children[0];
    this.modalService.onHide.next(form);
    Array.from(form).forEach((e) => {});
    this.fechar();
  }

  fechar() {
    this.bsModalRef.hide();
  }
}
