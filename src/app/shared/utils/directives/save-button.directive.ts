import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appSaveButton]',
})
export class SaveButtonDirective {
  @Input('save') save: boolean;
  @Input('changeColor') changeColor: boolean;
  constructor(private element: ElementRef) {}

  @HostListener('click') onClick() {
    while (this.element.nativeElement.getAttribute('role') != 'dialog') {
      this.element.nativeElement = this.element.nativeElement.parentNode;
    }
  }
}
