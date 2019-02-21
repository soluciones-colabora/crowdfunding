import { Injectable } from '@angular/core';

import { DropdownField } from '../../dynamic-forms/classes/field-dropdown';
import { FieldBase } from '../../dynamic-forms/classes/field-base';
import { TextboxField } from '../../dynamic-forms/classes/field-textbox';
import { DatepickerField } from '../../dynamic-forms/classes/field-datepicker';
import { ButtonToggleField } from '../../dynamic-forms/classes/field-buttonToggle';
import { UploadField } from '../../dynamic-forms/classes/field-upload';


@Injectable()
export class FieldService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getFormFields() {

    const firstFormFields: FieldBase<any>[] = [

      new TextboxField({
        key: 'title',
        label: 'Title',
        required: true,
        placeholder: 'Nombre de la campaña',
        order: 1,
      }),


      new UploadField({
        key: 'logo',
        label: 'Logotipo',
        text: 'SUBIR LOGO',
        type: 'image/*',
        required: true,
        order: 2
      }),

      new TextboxField({
        key: 'goal',
        label: 'Goal',
        required: true,
        placeholder: 'Meta',
        order: 3
      }),

      new DropdownField({
        key: 'duration',
        label: 'Duración en días',
        options: [
          {key: '15',  value: 15 },
          {key: '30',  value: 30 },
          {key: '60',  value: 60 },
        ],
        required: true,
        order: 4
      }),
    ];

    const secondFormFields: FieldBase<any>[] = [

      new TextboxField({
        key: 'description',
        label: 'Description',
        required: true,
        textarea: true,
        placeholder: 'Breve descripción de la campaña',
        cols: 2,
        order: 1
      }),

      new TextboxField({
        key: 'objective',
        label: 'Objective',
        required: true,
        textarea: true,
        placeholder: 'Objetivos que la campaña pretende lograr',
        cols: 2,
        order: 2
      }),

      new TextboxField({
        key: 'moneyUsage',
        label: 'MoneyUsage',
        required: true,
        textarea: true,
        placeholder: '¿Cómo se usará el dinero?',
        cols: 2,
        order: 3
      }),

    ];

    return [
      firstFormFields.sort((a, b) => a.order - b.order),
      secondFormFields.sort((a, b) => a.order - b.order),
    ];
  }

}
