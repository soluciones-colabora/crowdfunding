import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import {CdkTextareaAutosize} from '@angular/cdk/text-field';

import { FieldBase } from '../../classes/field-base';

@Component({
  selector: 'app-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  public file: File;
  public fileid;
  public fileError = {
    unsupported : false,
    size : false,
  };

  // State for dropzone CSS toggling
  public  isHovering: boolean;

  constructor ( ) {
    const date = new Date();
    this.fileid = '' + date.getTime();
  }

  get isValid() { return this.form.controls[this.field.key].valid; }

  onFileChange(event: FileList) {
    this.fileError.unsupported = false;
    this.fileError.size = false;
    if (event.length === 0) { return; }
    this.file = null;
    // Client-side validation example
    if (this.field['type'] &&
      !(
        this.field['type'].includes(event.item(0).type.split('/')[0]) ||
        this.field['type'].includes(event.item(0).type.split('/')[1]) ||
        this.field['type'].includes(event.item(0).name.split('.')[1])
      )) {
      event.item(0).type.includes(this.field['type'])
      console.error('unsupported file type :( ');
      this.fileError.unsupported = true;
      return;
    }

    if (event.item(0).size >= this.field['maxSize']) {
      console.error('file too large ');
      this.fileError.size = true;
      return;
    }

    this.file = event.item(0);

    const formValueToSet = {...this.form.value};
    formValueToSet[this.field.key] = this.file;
    this.form.setValue(formValueToSet);
  }

  onFileDrop(event: FileList) {
    if (event.length === 0) { return; }
    const formValueToSet = {...this.form.value};
    formValueToSet[this.field.key] = event;
    this.form.setValue(formValueToSet);
  }

  onFileClick(id: string) {
    document.getElementById(id).click();
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
