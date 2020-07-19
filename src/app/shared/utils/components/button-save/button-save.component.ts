import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-button-save',
  templateUrl: './button-save.component.html',
  styleUrls: ['./button-save.component.css'],
})
export class ButtonSaveComponent implements OnChanges {
  @Input('form') form: FormGroup;
  @Output() save = new EventEmitter();
  @Output() changeColor: boolean;
  isDirty$: Observable<boolean>;
  constructor() {}

  ngOnChanges(): void {
    this.form.valueChanges.pipe(skip(1)).subscribe(() => {
      this.changeColor = true;
    });
  }
}
