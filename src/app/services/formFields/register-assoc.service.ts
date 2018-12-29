import { Injectable } from '@angular/core';

import { DropdownField } from '../../dynamic-forms/classes/field-dropdown';
import { FieldBase } from '../../dynamic-forms/classes/field-base';
import { TextboxField } from '../../dynamic-forms/classes/field-textbox';

@Injectable()
export class FieldService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getFirstFormFields() {

    const fields: FieldBase<any>[] = [

      // new DropdownField({
      //   key: 'brave',
      //   label: 'Bravery Rating',
      //   options: [
      //     {key: 'solid',  value: 'Solid'},
      //     {key: 'great',  value: 'Great'},
      //     {key: 'good',   value: 'Good'},
      //     {key: 'unproven', value: 'Unproven'}
      //   ],
      //   order: 3
      // }),

      new TextboxField({
        key: 'emailAddress',
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: 'Correo electrónico',
        order: 1
      }),

      new TextboxField({
        key: 'name',
        label: 'Name',
        required: true,
        placeholder: 'Nombre completo del representante',
        order: 2
      }),

      new TextboxField({
        key: 'acname',
        label: 'ACname',
        required: true,
        placeholder: 'Nombre de la Asociación Civil',
        order: 3
      }),

      new TextboxField({
        key: 'cluni',
        label: 'cluni',
        required: true,
        placeholder: 'CLUNI',
        order: 4
      }),
    ];

    return fields.sort((a, b) => a.order - b.order);
  }

  getSecondFormFields() {
    const fields: FieldBase<any>[] = [
      new TextboxField({
        key: 'summary',
        label: 'Summary',
        required: true,
        placeholder: 'Resumen',
        order: 1
      }),

      new TextboxField({
        key: 'mission',
        label: 'Mission',
        required: true,
        placeholder: 'Misión',
        order: 2
      }),

      new TextboxField({
        key: 'vision',
        label: 'Vision',
        required: true,
        placeholder: 'Visión',
        order: 3
      }),

      new TextboxField({
        key: 'values',
        label: 'Values',
        required: true,
        placeholder: 'Valores (cada valor separado por una coma ",")',
        order: 4
      }),
    ];

    return fields.sort((a, b) => a.order - b.order);
  }

  getThirdFormFields() {
    const fields: FieldBase<any>[] = [
      new TextboxField({
        key: 'video',
        label: 'Video',
        required: true,
        placeholder: 'Video (URL)',
        order: 1
      }),

      new TextboxField({
        key: 'something',
        label: 'something',
        required: true,
        placeholder: 'something',
        order: 2
      }),
    ];

    return fields.sort((a, b) => a.order - b.order);
  }

}
