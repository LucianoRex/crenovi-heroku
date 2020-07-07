import { DynamicFormTableResource } from 'src/app/shared/utils/classes/dynamic-form-table-resource';
import {
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
import { AcolhidoService } from '../services/acolhido.service';
import { DynamicListService } from 'src/app/shared/utils/services/dynamic-list.service';
import { ToastrService } from 'ngx-toastr';

export class AcolhidoResource extends DynamicFormTableResource
  implements OnDestroy {
  //socket = io(environment.SOCKET_ENDPOINT);
  @Input() concatenatedPath: string;
  socketdata: string;
  @Input() _id: string = undefined;
  @Output() saved = new EventEmitter<boolean>();
  protected acolhidoService: AcolhidoService;
  protected dynamicListService: DynamicListService;
  private toastr: ToastrService;
  constructor(protected injector: Injector) {
    super(injector);
    this.acolhidoService = injector.get(AcolhidoService);
    this.dynamicListService = injector.get(DynamicListService);
    this.toastr = injector.get(ToastrService);
  }

  ngOnDestroy(): void {
    // this.socket.disconnect()
  }

  save() {
    this.acolhidoService
      .save(this.form.value, this._id, this.concatenatedPath)
      .subscribe(
        (res) => {
          this.toastr.success('Salvo');
          this.selectedRow.emit(res);
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
    this.acolhidoService.remove(path);
  }
}
