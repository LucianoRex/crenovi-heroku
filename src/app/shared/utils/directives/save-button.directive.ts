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
export class SaveButtonDirective implements OnChanges {
  @Input('save') save: boolean;
  @Input('changeColor') changeColor: boolean;
  constructor(private element: ElementRef) {}
  ngOnChanges(): void {
    this.changeColor
      ? ((this.element.nativeElement.querySelector('span').textContent =
          'Click para salvar'),
        this.element.nativeElement
          .querySelector('span')
          .setAttribute('className', 'blink'))
      : null;
  }

  @HostListener('click') onClick() {
    console.log(this.element.nativeElement.querySelector('span'));

    while (this.element.nativeElement.getAttribute('role') != 'dialog') {
      this.element.nativeElement = this.element.nativeElement.parentNode;
    }
  }
}
