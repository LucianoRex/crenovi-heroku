import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import { ProntuarioService } from '../services/prontuario.service';
import {
  Injector,
  Input,
  Inject,
  Component,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicListService } from 'src/app/shared/utils/services/dynamic-list.service';

export class ProntuarioResource extends DynamicFormTableResource
  implements OnDestroy {
  //socket = io(environment.SOCKET_ENDPOINT);
  @Input() concatenatedPath: string;
  socketdata: string;
  @Input() _id: string = undefined;
  @Output() saved = new EventEmitter<boolean>();
  protected prontuarioService: ProntuarioService;
  protected dynamicListService: DynamicListService;
  private toastr: ToastrService;
  constructor(protected injector: Injector) {
    super(injector);
    this.prontuarioService = injector.get(ProntuarioService);
    this.dynamicListService = injector.get(DynamicListService);
    this.toastr = injector.get(ToastrService);
  }

  ngOnDestroy(): void {
    // this.socket.disconnect()
  }

  save() {
    this.prontuarioService
      .save(this.form.value, this._id, this.concatenatedPath)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Salvo');
          this.createdDoc.emit(res);
          //   this.socket.emit(this.form.get('path').value, res);
          //   this.socket.disconnect();
          this.saved.emit(true);
        },
        (err) => {
          this.toastr.error(err);
          this.saved.emit(false);
        }
      );
  }
  remove(path) {
    this.prontuarioService
      .remove(path)
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.warning('Deletado');
        },
        (err) => {
          this.toastr.error(err);
          this.saved.emit(false);
        }
      );
  }

  concluirTratamento() {
    const dialogRef = this.dialog.open(Conclusao, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.prontuarioService
          .concluirTratamento(this.concatenatedPath, result)
          .subscribe(
            (res) => {
              this.toastr.success('Tratamento concluído');
              this.selectedRow.emit(res);
              /*            this.socket.emit(
              this.form.get('path').value,
              this.form.get('path').value,
              res
            );
            */
            },
            (err) => {
              this.toastr.error(err);
            }
          );
      }
    });
  }
}

@Component({
  selector: 'app-conclusao',
  template: `
    <div mat-dialog-content>
      <mat-form-field>
        <mat-label>Data da Conclusão</mat-label>
        <input matInput [matDatepicker]="picker" [(ngModel)]="dataEgresso" />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Motivo</mat-label>
        <mat-select [(ngModel)]="motivo">
          <mat-option *ngFor="let motivo of motivos" [value]="motivo">
            {{ motivo }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button
        mat-button
        [mat-dialog-close]="{ dataEgresso: dataEgresso, motivo: motivo }"
        cdkFocusInitial
      >
        Ok
      </button>
    </div>
  `,
})
export class Conclusao {
  dataEgresso: string;
  motivo: string;
  motivos: any[] = [
    'Alta terapêutica',
    'Abandono',
    'Fuga',
    'Desistência',
    'Alta Administrativa',
  ];
  constructor(
    public dialogRef: MatDialogRef<Conclusao>,
    @Inject(MAT_DIALOG_DATA) public data: { data: string; motivo: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
