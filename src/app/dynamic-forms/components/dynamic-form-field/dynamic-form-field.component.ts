import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase } from '../../classes/field-base';

@Component({
  selector: 'app-field',
  templateUrl: './dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent {
  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  public file: File;
  public fileid;

  constructor ( ) {
    const date = new Date();
    this.fileid = '' + date.getTime();
  }

  get isValid() { return this.form.controls[this.field.key].valid; }

  onFileChange(event: FileList) {
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
      // this.fileError.unsupported = true;
      return;
    }

    if (event.item(0).size >= this.field['maxSize']) {
      console.error('file too large ');
      // this.fileError.size = true;
      return;
    }

    this.file = event.item(0);
    console.log('this.file :', this.file);
  }

  onFileClick(id: string) {
    document.getElementById(id).click();
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
