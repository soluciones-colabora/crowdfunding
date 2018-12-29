import { FieldBase } from './field-base';

export class DatepickerField extends FieldBase<string> {
  controlType = 'datepicker';
  min: Date;
  max: Date;

  constructor(options: {} = {}) {
    super(options);
    this.min = options['min'] || new Date(1900, 0, 1);
    this.max = options['max'] || new Date(2100, 0, 1);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/