import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  // Inputs designed to work with mat-stepper
  @Input() backButton: Boolean = false;
  @Input() lastForm: Boolean = false;
  @Input() label: string;

  // Inputs used for nested forms
  @Input() formsArray: FormArray;
  @Input() parentField: FieldBase<any>;


  @Output() submited = new EventEmitter<any>();
  @Output() formOut = new EventEmitter<any>();

  // form: FormGroup;
  payLoad = '';
  nextButtonText = '';
  form: FormGroup;
  isHandset = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(private fcs: FieldControlService,
    private breakpointObserver: BreakpointObserver) {
      this.isHandset$.subscribe(result => {
        this.isHandset = result;
        if (this.formsArray) {
          this.parentField.rows = this.isHandset ? this.formsArray.length * this.fields.length : this.formsArray.length;
          console.log('this.parentField.rows :', this.parentField.rows);
        }
      });
  }

  ngOnInit() {
    // console.log('this.fields :', this.fields);
    if (this.formsArray) {
      const newform = this.fcs.toFormGroup(this.fields);
      this.formsArray.push(newform);
      // let smt  = this.formsArray.length * this.fields.length;
      // console.log('smt :', smt);
      // console.log('this.key :', this.key);
      // let newkey = this.key;
      // for (const key in this.form.controls) {
      //   if (this.form.controls.hasOwnProperty(this.key)) {
      //     const element = this.form.controls[key];

      //   }
      // }
      // console.log('this.form :', this.form);


      // this.formsArray = this.formsArray.controls;
      // console.log('formsArray :', this.formsArray);
      // (<FormArray>this.form.controls[this.key]).push(this.newform);


    } else {
      this.form = this.fcs.toFormGroup(this.fields);
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
    console.log('adding');
    const newform = this.fcs.toFormGroup(this.fields);
    this.formsArray.push(newform);
    this.parentField.rows = this.isHandset ? this.formsArray.length * this.fields.length : this.formsArray.length;
  }

  removeForm(index: number) {
    console.log('removing');
    this.formsArray.removeAt(index);
    this.parentField.rows = this.isHandset ? this.formsArray.length * this.fields.length : this.formsArray.length;
  }
}
