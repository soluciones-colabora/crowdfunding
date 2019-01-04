import { FieldBase } from './field-base';

export class FormField extends FieldBase<string> {
  controlType = 'form';
  fields: any[];

  constructor(options: {} = {}) {
    super(options);
    this.fields = options['fields'] || [];
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
