import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

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
  @Input() cols: Number = 2;
  @Input() backButton: Boolean = false;
  @Input() lastForm: Boolean = false;
  @Input() form: FormGroup;
  @Input() key: string;

  @Output() submited = new EventEmitter<any>();
  @Output() formOut = new EventEmitter<any>();

  // form: FormGroup;
  payLoad = '';
  nextButtonText = '';
  main= true;
  newform: FormGroup;
  formsArray;

  constructor(private fcs: FieldControlService) {  }

  ngOnInit() {
    // console.log('this.fields :', this.fields);
    if(this.form && this.key) {
      console.log('eureka!');
      console.log('this.key :', this.key);
      // let newkey = this.key;
      // for (const key in this.form.controls) {
      //   if (this.form.controls.hasOwnProperty(this.key)) {
      //     const element = this.form.controls[key];

      //   }
      // }
      this.main = false;
      this.newform = this.fcs.toFormGroup(this.fields);
      this.formsArray = (<FormArray>this.form.controls[this.key]).controls;
      console.log('formsArray :', this.formsArray);
      (<FormArray>this.form.controls[this.key]).push(this.newform);
      console.log('this.form :', this.form);

    } else {
    this.form = this.fcs.toFormGroup(this.fields);
    console.log('this.form :', this.form);
    this.formOut.emit(this.form);
    }


    const fieldCols = this.fields.map(field => field.cols);
    const maxCol = Math.max(...fieldCols);
    if ( maxCol > this.cols ) { this.cols = maxCol; }

    this.lastForm ? this.nextButtonText = 'FINALIZAR REGISTRO' : this.nextButtonText = 'SIGUIENTE';
  }

  onSubmit() {
    this.payLoad = this.form.value;
    this.submited.emit(this.payLoad);
  }

  addForm() {
    console.log('hello');
    this.newform = this.fcs.toFormGroup(this.fields);
    (<FormArray>this.form.controls[this.key]).push(this.newform);
  }
}
