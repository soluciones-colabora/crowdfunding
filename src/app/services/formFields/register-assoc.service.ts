import { Injectable } from '@angular/core';

import { DropdownField } from '../../dynamic-forms/classes/field-dropdown';
import { FieldBase } from '../../dynamic-forms/classes/field-base';
import { TextboxField } from '../../dynamic-forms/classes/field-textbox';
import { RadiobuttonField } from '../../dynamic-forms/classes/field-radiobutton';
import { FormField } from '../../dynamic-forms/classes/field-form';
import { UploadField } from '../../dynamic-forms/classes/field-upload';




@Injectable()
export class FieldService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getProductsFormFields() {

    const fields: FieldBase<any>[] = [
      new TextboxField({
        key: 'test1',
        label: 'test1',
        required: true,
        type: 'email',
        placeholder: 'test1',
        order: 1
      }),

      new TextboxField({
        key: 'test2',
        label: 'test2',
        required: true,
        placeholder: 'test2',
        order: 2
      })

    ];

    return fields.sort((a, b) => a.order - b.order);
  }

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

      new RadiobuttonField({
        key: 'donnor',
        label: '¿Es una donadora autorizada?',
        options: [
          {key: 'Si',  value: 'Si'},
          {key: 'No',  value: 'No'}
        ],
        order: 5
      }),

      new UploadField({
        key: 'logo',
        label: 'Logotipo',
        text: 'SUBIR LOGO',
        type: 'image/*',
        // type: 'application/pdf',
        // type: '.doc,.docx',
        order: 6
      }),

      new TextboxField({
        key: 'address',
        label: 'Address',
        required: true,
        placeholder: 'Dirección (calle, número, cruzamientos)',
        order: 7
      }),

      new TextboxField({
        key: 'postalCode',
        label: 'Postal Code',
        type: 'number',
        maxlength: '5',
        required: true,
        placeholder: 'Código Postal',
        order: 8
      }),

      new TextboxField({
        key: 'state',
        label: 'State',
        required: true,
        placeholder: 'Estado',
        order: 9
      }),

      new TextboxField({
        key: 'locality',
        label: 'Locality',
        required: true,
        placeholder: 'Localidad',
        order: 10
      }),

      new TextboxField({
        key: 'cellphone',
        label: 'Cellphone',
        type: 'tel',
        required: true,
        placeholder: 'Celular',
        order: 11
      }),

      new TextboxField({
        key: 'phone',
        label: 'Phone',
        type: 'tel',
        required: true,
        placeholder: 'Teléfono fijo',
        order: 12
      }),

      new TextboxField({
        key: 'edad',
        label: 'edad',
        type: 'number',
        required: true,
        placeholder: 'Edad',
        cols: 2,
        order: 13
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

      new TextboxField({
        key: 'beneficiaries',
        label: 'Beneficiaries',
        required: true,
        placeholder: 'Beneficiarios',
        order: 5
      }),

      new TextboxField({
        key: 'valueProposition',
        label: 'Value Proposition',
        required: true,
        placeholder: 'Propuesta de valor',
        order: 6
      }),

      new TextboxField({
        key: 'changeTheory',
        label: 'Change Theory',
        required: true,
        placeholder: 'Teoría del cambio',
        order: 7
      }),

      new DropdownField({
        key: 'ODS',
        label: 'ODS',
        options: [
          {key: 'value1',  value: 'value1'},
          {key: 'value2',  value: 'value2'}
        ],
        required: true,
        order: 8
      }),

      new TextboxField({
        key: 'awards',
        label: 'Awards',
        required: true,
        placeholder: 'Premios o reconocimientos (cada uno separado por una coma ",")',
        order: 9
      }),

      new FormField({
        key: 'formfield',
        label: 'formfield',
        placeholder: 'FORM FIELD',
        fields: this.getProductsFormFields(),
        // required: true,
        cols: 2,
        order: 10
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

      new UploadField({
        key: 'cert',
        label: 'Certificación de institucionalidad y transparencia',
        text: 'SUBIR ARCHIVO',
        // type: 'image/*',
        type: 'application/pdf',
        // type: '.doc,.docx',
        order: 2
      }),
    ];

    return fields.sort((a, b) => a.order - b.order);
  }


}
