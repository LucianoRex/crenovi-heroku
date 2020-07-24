import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class DynamicListService {
  data$ = new BehaviorSubject<any>(null);
  //socket = io(environment.SOCKET_ENDPOINT);
  constructor() {}

  send(form: any, value: any) {    
   // this.socket.emit('avaliacao', value);  
    //this.data$.next({ form: form.path, form2: form.path, value: value })
  }

  get(): Observable<any> {
    return this.data$.asObservable();
  }
}
