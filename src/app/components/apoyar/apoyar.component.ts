import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from '@angular/core';
import { FieldService } from 'src/app/services/formFields/register-donor.service';
import { ButtonToggleField } from '../../dynamic-forms/classes/field-buttonToggle';
import { ProjectService } from '../../services/database/Project/project.service';

import { Observable, of } from 'rxjs';

interface Project {
  title?: string;
  description?: string;

  timeRemaining?: number;
  goal?: number;
  amountcollected?: number;
  percentage?: number;
  numberdonors?: number;
  rating?: number;

  uid?:          any;
  createdOn?:    Date;
}
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

  projects$: Observable<Project[]>;

  items = Array.from({length: 6}).map((_, i) => `Item #${i}`);

  constructor(fieldservice: FieldService, projectService: ProjectService) {
    this.odsFields = fieldservice.getSecondFormFields();
    // projectService.insertFake(5);
    this.projects$ = projectService.getData();
  }

  ngOnInit() {
  }

  buttonToggleChanged(field: ButtonToggleField) {
    field.checked = !field.checked;
  }

}
