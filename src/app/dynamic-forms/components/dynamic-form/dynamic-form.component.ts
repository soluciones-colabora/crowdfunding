import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../../classes/field-base';
import { FieldControlService } from '../../field-control.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ FieldControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() fields: FieldBase<any>[] = [];
  @Input() backButton: Boolean = false;
  @Input() lastForm: Boolean = false;
  @Output() submited = new EventEmitter<any>();
  @Output() formOut = new EventEmitter<any>();

  form: FormGroup;
  payLoad = '';
  nextButtonText = '';

  constructor(private fcs: FieldControlService) {  }

  ngOnInit() {
    this.form = this.fcs.toFormGroup(this.fields);
    this.formOut.emit(this.form);
    this.lastForm ? this.nextButtonText = 'FINALIZAR REGISTRO' : this.nextButtonText = 'SIGUIENTE';
  }

  onSubmit() {
    this.payLoad = this.form.value;
    this.submited.emit(this.payLoad);
  }
}
