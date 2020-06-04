import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import { ProntuarioService } from '../services/prontuario.service';
import { Injector, Input, Inject, Component } from '@angular/core';
import * as io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

export class ProntuarioResource extends DynamicFormTableResource {
  socket = io(environment.SOCKET_ENDPOINT);
  socketdata: string;
  @Input() _id: string = undefined;
  protected prontuarioService: ProntuarioService;
  private toastr: ToastrService;
  constructor(protected injector: Injector) {
    super(injector);
    this.prontuarioService = injector.get(ProntuarioService);
    this.toastr = injector.get(ToastrService);
  }
  save() {
    console.log(this.form.value);
    this.prontuarioService.save(this.form.value).subscribe(
      (res) => {
        this.toastr.success('Salvo');
        console.log(res);
        this.selectedRow.emit(res);
        this.socket.emit('updatedata', res);
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }

  concluirTratamento() {
    const dialogRef = this.dialog.open(Conclusao, {
      width: '250px',      
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.prontuarioService.concluirTratamento(result).subscribe(
          (res) => {
            this.toastr.success('Tratamento concluído');
            console.log(res);
            this.selectedRow.emit(res);
            this.socket.emit('updatedata', res);
          },
          (err) => {
            this.toastr.error(err);
          }
        );
      }
    });
  }
  remove() {
    this.prontuarioService.remove();
  }
}

@Component({
  selector: 'app-conclusao',
  template: `
    <div mat-dialog-content>
      <p>Motivo da conclusão</p>
      <mat-form-field>
        <mat-label>Motivo</mat-label>
        <mat-select [(ngModel)]="data">
          <mat-option *ngFor="let motivo of motivos" [value]="motivo">
            {{ motivo }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        Ok
      </button>
    </div>
  `,
})
export class Conclusao {
  motivos: any[] = [
    'Alta terapêutica',
    'Abandono',
    'Fuga',
    'Desistência',
    'Alta Administrativa',
  ];
  constructor(
    public dialogRef: MatDialogRef<Conclusao>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
