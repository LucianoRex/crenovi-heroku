import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicListService {
  data$ = new BehaviorSubject<any>(null);
  constructor() {}

  send(message: string) {
    this.data$.next(message);
  }

  get(): Observable<any> {
    return this.data$.asObservable();
  }
}
