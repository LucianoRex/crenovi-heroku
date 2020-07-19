import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  Injector,
  Renderer2,
} from '@angular/core';
import { AcolhidoResource } from '../../classes/acolhido-resource';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { DynamicListBuilderComponent } from 'src/app/shared/utils/components/dynamic-list-builder/dynamic-list-builder.component';

@Component({
  selector: 'app-acolhido-form',
  templateUrl: './acolhido-form.component.html',
  styleUrls: ['./acolhido-form.component.css'],
  providers: [DatePipe],
})
export class AcolhidoFormComponent extends AcolhidoResource implements OnInit {
  apiUrl = environment.apiBaseUrl;
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  /**
   *
   *
   *
   */

  @ViewChild('cam') cam: TemplateRef<any>;
  listaProfissao;
  religioes: any[] = ['Católico', 'Evangélico', 'Espírita', 'Muçulmano'];
  url: any =
    'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg';
  modalRef: BsModalRef;

  constructor(
    protected injector: Injector,
    protected datePipe: DatePipe,
    protected renderer: Renderer2,
    private modalService: BsModalService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      path: 'acolhido',
      acolhido: this.fb.group({
        _id: undefined,
        nome: [''],
        dataNasc: [''],
        nomeMae: [''],
        religiao: [''],
        rg: [''],
        cpf: [''],
        tituloEleitor: [''],
        carteiraTrabalho: [''],
        telefone: [''],
        acolhidoImage: [''],
        ocupacao: this.fb.group({
          _id: '5eca6bc7f9a0f116187451a7',
          TITULO: ['Empregado  doméstico  nos serviços gerais'],
        }),
        endereco: this.fb.group({
          n: [''],
          complemento: [''],
          logradouro: [''],
          bairro: [''],
          localidade: [''],
          uf: [''],
          cep: [''],
        }),
      }),
    });
    this._id !== undefined
      ? this.acolhidoService
          .readById('acolhido', this._id)
          .subscribe((res: any) => {
            this.form.get('acolhido').patchValue(res);
            this.url = res.acolhidoImage;
          })
      : null;
    this.notify.emit(this.form);

    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  buscaCep(cep: string) {
    console.log(cep);
    return this.acolhidoService
      .buscaApi(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe(
        (res) => {
          if (res.erro) {
            this.toastr.error('CEP Não encontrado');
          }
          this.form.get('acolhido').get('endereco').patchValue(res);
          console.log(this.form.value);
        }

        // (data) => (this.resultado = this.converterRespostaParaCep(data))
      );
  }

  buscaProfissao() {
    let columns = [
      {
        name: 'CODIGO',
        label: 'Código',
      },

      {
        name: 'TITULO',
        label: 'Ocupação',
      },
    ];
    const dialogRef = this.dialog.open(DynamicListBuilderComponent, {
      maxWidth: '90vw',
      width: '90vw',
      height: '80vh',
      hasBackdrop: false,
      panelClass: 'app-full-bleed-dialog',
      data: {
        api: `${this.apiUrl}/busca/ocupacao`,
        columns: columns,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.form.get('acolhido').get('ocupacao').patchValue(res);
      }
    });
  }

  public openCam(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    const dialogRef = this.dialog.open(this.cam, {
      width: '100%',
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  AtivarCam() {
    this.showWebcam = true;
  }
  desativarCam() {
    this.showWebcam = false;
  }

  onSelectFile(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
        this.form.patchValue({
          acolhido: { acolhidoImage: event.target.result },
        });
      };
    }
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.url = webcamImage.imageAsDataUrl;
    this.form.patchValue({
      acolhido: { acolhidoImage: webcamImage.imageAsDataUrl },
    });
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
