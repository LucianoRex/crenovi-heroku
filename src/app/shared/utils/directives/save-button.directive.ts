import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appSaveButton]',
})
export class SaveButtonDirective {
  constructor(private element: ElementRef) {}
  @HostListener('click') onClick() {
    while (this.element.nativeElement.getAttribute('role') != 'dialog') {
      this.element.nativeElement = this.element.nativeElement.parentNode;
    }
  }

  @Input('save') save: boolean;
}
