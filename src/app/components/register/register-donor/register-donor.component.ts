import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ButtonToggleField } from '../../../dynamic-forms/classes/field-buttonToggle'


import { FieldService } from '../../../services/formFields/register-donor.service';

@Component({
  selector: 'app-register-donor',
  templateUrl: './register-donor.component.html',
  styleUrls: ['./register-donor.component.scss'],
  providers:  [ FieldService ]
})
export class RegisterDonorComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  firstFormFields: any[];
  secondFormFields: any[];

  payload: {};


  constructor(service: FieldService) {
    this.firstFormFields = service.getFirstFormFields();
    this.secondFormFields = service.getSecondFormFields();
  }

  ngOnInit() {
  }

  onSubmit(payload) {
    this.payload = Object.assign(this.payload, payload);
    const interests = {};
    this.secondFormFields.forEach(field => {
      interests[field.label] = field.checked;
    });
    this.payload = { ...this.payload, interests };
    console.log('payload :', this.payload);
  }

  buttonToggleChanged(field: ButtonToggleField) {
    field.checked = !field.checked;
  }

}
