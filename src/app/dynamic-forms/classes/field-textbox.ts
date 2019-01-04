import { FieldBase } from './field-base';

export class TextboxField extends FieldBase<string> {
  controlType = 'textbox';
  type: string;
  maxlength: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.maxlength = options['maxlength'] || '';
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
