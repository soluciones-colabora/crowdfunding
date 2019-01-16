import { FieldBase } from './field-base';

export class DropZoneField extends FieldBase<string> {
  controlType = 'dropZone';
  type: string;
  maxSize: number;
  text: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.maxSize = options['maxSize'] || 1 * 1024 * 1024;
    this.text = options['text'] || 'SUBIR ARCHIVO';
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
