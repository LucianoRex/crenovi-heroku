import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProntuarioSocketService {
  socket = io(environment.SOCKET_ENDPOINT + '/prontuario');
  constructor() {}
  emitSocket(form, value) {    
   // this.socket.emit(form.path, form.path, value);
    this.subject.next({ form: form.path, form2: form.path, value: value });
  }

  private subject = new BehaviorSubject<any>(null);

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
   // this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
