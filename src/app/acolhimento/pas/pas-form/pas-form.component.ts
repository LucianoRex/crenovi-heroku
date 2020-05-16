import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pas-form',
  templateUrl: './pas-form.component.html',
  styleUrls: ['./pas-form.component.css']
})
export class PasFormComponent implements OnInit {

  isLinear = false;
  myFormGroup: FormGroup;
  _id: string;
  constructor() {}

  ngOnInit() {
    console.log(this._id);
    this.isLinear = true
   // this._id != undefined ? (this.isLinear = false) : (this.isLinear = true);
  }

  onNotify(formGroup: FormGroup): void {
    this.myFormGroup = formGroup;    
    console.log(this.myFormGroup)
  }

}
