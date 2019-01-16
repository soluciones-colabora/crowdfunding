import { Component, OnInit } from '@angular/core';
import { FieldService } from 'src/app/services/formFields/register-donor.service';
import { ButtonToggleField } from '../../dynamic-forms/classes/field-buttonToggle';
@Component({
  selector: 'app-apoyar',
  templateUrl: './apoyar.component.html',
  styleUrls: ['./apoyar.component.scss'],
  providers:  [ FieldService ]
})
export class ApoyarComponent implements OnInit {
odsFields: any[];
  constructor(fieldservice: FieldService) { 
    this.odsFields = fieldservice.getSecondFormFields();
  }

  ngOnInit() {
  }

  buttonToggleChanged(field: ButtonToggleField) {
    field.checked = !field.checked;
  }

}
