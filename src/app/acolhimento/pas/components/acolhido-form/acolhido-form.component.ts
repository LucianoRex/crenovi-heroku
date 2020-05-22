import { Component, OnInit, Injector } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { PasResource } from '../../classes/pas-resource';

@Component({
  selector: 'app-acolhido-form',
  templateUrl: './acolhido-form.component.html',
  styleUrls: ['./acolhido-form.component.css'],
  providers: [DatePipe],
})
export class AcolhidoFormComponent extends PasResource implements OnInit {
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
  convenios: any[] = [
    {
      _id: 'SUS',
      nome: 'SUS',
    },
    {
      _id: 'SENAD',
      nome: 'SENAD',
    },
  ];

  encaminhado: any[] = [
    {
      _id: 1,
      nome: 'Hospital',
    },
    {
      _id: 2,
      nome: 'CAPS',
    },
  ];

  periodos: any[] = [
    {
      _id: '9',
      periodo: '9 meses',
    },
    {
      _id: '12',
      periodo: '12 meses',
    },
  ];
  constructor(protected injector: Injector, private datePipe: DatePipe) {
    super(injector);
  }

  ngOnInit(): void {
    this.pasService.pas_id = this._id;
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
        enderece: this.fb.group({
          rua: [''],
          n: [''],
          bairro: [''],
          municipio: [''],
          uf: [''],
          cep: [''],
        }),
      }),
    });
    this._id !== undefined
      ? this.pasService.readById('acolhido').subscribe((res: any) => {
          console.log(res);
          this.form.get('acolhido').patchValue(res);
        })
      : null;
    this.notify.emit(this.form);

    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
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
