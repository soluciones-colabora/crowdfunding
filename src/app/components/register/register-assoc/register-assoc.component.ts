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

  formFields: any[];
  firstFormFields: any[];
  secondFormFields: any[];
  thirdFormFields: any[];
  labels: string[];

  payload = {};

  constructor(private _formBuilder: FormBuilder, service: FieldService) {
    this.formFields = [];
    this.formFields.push(service.getFirstFormFields());
    this.formFields.push(service.getSecondFormFields());
    this.formFields.push(service.getThirdFormFields());

    this.firstFormFields = service.getFirstFormFields();
    this.secondFormFields = service.getSecondFormFields();
    this.thirdFormFields = service.getThirdFormFields();
    this.labels = service.getFormLabels();

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
    this.payload = Object.assign(this.payload, payload);
    console.log('payload :', this.payload);
  }

  getForm(asdf) {
    console.log('asdf :', asdf);

  }

}
