import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-button-save',
  templateUrl: './button-save.component.html',
  styleUrls: ['./button-save.component.css'],
})
export class ButtonSaveComponent implements OnInit {
  @Input('form') form: FormGroup;
  @Output() save = new EventEmitter();
  isDirty$: Observable<boolean>;
  constructor() {}

  ngOnInit(): void {}
}
