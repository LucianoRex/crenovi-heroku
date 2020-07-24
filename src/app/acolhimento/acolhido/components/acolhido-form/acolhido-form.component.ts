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
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  switchMap,
  finalize,
} from 'rxjs/operators';

@Component({
  selector: 'app-acolhido-form',
  templateUrl: './acolhido-form.component.html',
  styleUrls: ['./acolhido-form.component.css'],
  providers: [DatePipe],
})
export class AcolhidoFormComponent extends AcolhidoResource implements OnInit {
  apiUrl = environment.apiBaseUrl;
  filteredOptions;
  filteredCepOptions;
  isLoading = false;
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
          _id: [''],
          CODIGO: [''],
          TITULO: [''],
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
            this.url = res.acolhidoImage;
            this.form.get('acolhido').patchValue(res);
          })
      : null;
    this.notify.emit(this.form);

    this.form
      .get('acolhido')
      .get('ocupacao')
      .get('TITULO')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((query: string) => query?.length > 1),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
          this.acolhidoService
            .buscaOcupacao({ ocupacao: value }, 1)
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((users) => (this.filteredOptions = users));

    this.form
      .get('acolhido')
      .get('endereco')
      .get('cep')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        filter((query: string) => query?.length == 8),
        tap(() => (this.isLoading = true)),
        switchMap((value) =>
          this.acolhidoService
            .buscaCep({ cep: value })
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe((users) => this.buscaCep(users));

    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  buscaCep(option: any) {
    this.form.get('acolhido').get('endereco').patchValue(option);
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

  updateForm(ev: any, option: any) {
    this.form.get('acolhido').get('ocupacao').patchValue(option);
    /*if (ev.isUserInput) {
      if (componentid === 'country_id') {
        this.countryid = idd;
        this.registerUserForm['controls']['country_id'].setValue(ev.source.value);
      }  else {
        console.log('ooops');
      }
    }*/
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
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
