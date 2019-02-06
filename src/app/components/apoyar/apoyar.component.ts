import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FieldService } from 'src/app/services/formFields/register-donor.service';
import { ButtonToggleField } from '../../dynamic-forms/classes/field-buttonToggle';
@Component({
  selector: 'app-apoyar',
  templateUrl: './apoyar.component.html',
  styleUrls: ['./apoyar.component.scss'],
  providers:  [ FieldService ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApoyarComponent implements OnInit {
  odsFields: any[];
  items = Array.from({length: 6}).map((_, i) => `Item #${i}`);
  constructor(fieldservice: FieldService) {
    this.odsFields = fieldservice.getSecondFormFields();
  }

  ngOnInit() {
  }

  buttonToggleChanged(field: ButtonToggleField) {
    field.checked = !field.checked;
  }

}
