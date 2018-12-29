import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { FieldService } from '../../../services/formFields/register-assoc.service';
@Component({
  selector: 'app-register-assoc',
  templateUrl: './register-assoc.component.html',
  styleUrls: ['./register-assoc.component.scss'],
  providers:  [ FieldService ]
})
export class RegisterAssocComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  firstFormFields: any[];
  secondFormFields: any[];
  thirdFormFields: any[];

  payload: {};

  constructor(private _formBuilder: FormBuilder, service: FieldService) {
    this.firstFormFields = service.getFirstFormFields();
    this.secondFormFields = service.getSecondFormFields();
    this.thirdFormFields = service.getThirdFormFields();

  }

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   email: ['', Validators.required],
    //   name: ['', Validators.required],
    //   acname: ['', Validators.required],
    //   cluni: ['', Validators.required]

    // });
  }

  onSubmit(payload) {
    this.payload = { ...payload, ...this.payload };
    console.log('payload :', this.payload);
  }
}
