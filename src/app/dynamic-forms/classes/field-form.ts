import { FieldBase } from './field-base';

export class FormField extends FieldBase<string> {
  controlType = 'form';
  fields: any[];
  childCols: number;

  constructor(options: {} = {}) {
    super(options);
    this.fields = options['fields'] || [];
    this.childCols = options['childCols'] || 2;

  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
