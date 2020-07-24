import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogLoaderService {

  private subject = new Subject<any>();

  sendLoad(load: boolean) {
      this.subject.next(load);
  }

  clearMessages() {
      this.subject.next();
  }

  getLoad(): Observable<any> {
      return this.subject.asObservable();
  }
}
