export class ButtonToggleField {
  label: string;
  checked: boolean;
  order: number;

  constructor(options: {
    label?: string,
    checked?: boolean,
    order?: number } = {}) {
    this.label = options['label'] || '';
    this.checked = options['checked'] || false;
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
