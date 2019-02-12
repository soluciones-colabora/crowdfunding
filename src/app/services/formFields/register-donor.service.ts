import { Injectable } from '@angular/core';

import { DropdownField } from '../../dynamic-forms/classes/field-dropdown';
import { FieldBase } from '../../dynamic-forms/classes/field-base';
import { TextboxField } from '../../dynamic-forms/classes/field-textbox';
import { DatepickerField } from '../../dynamic-forms/classes/field-datepicker';
import { ButtonToggleField } from '../../dynamic-forms/classes/field-buttonToggle';



@Injectable()
export class FieldService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getFirstFormFields() {

    const fields: FieldBase<any>[] = [

      new TextboxField({
        key: 'name',
        label: 'Name',
        required: true,
        placeholder: 'Nombre completo',
        order: 1,
      }),

      new TextboxField({
        key: 'password',
        label: 'Password',
        required: true,
        placeholder: 'Contraseña',
        order: 3,
      }),
      new TextboxField({
        key: 'email',
        label: 'Email',
        required: true,
        type: 'email',
        placeholder: 'Correo electrónico',
        order: 2
      }),

      new TextboxField({
        key: 'newpassword',
        label: 'newPassword',
        required: true,
        type: 'password',
        placeholder: 'Vuelve a escribir tu contraseña',
        order: 4
      }),

      new TextboxField({
        key: 'phone',
        label: 'Phone',
        required: true,
        placeholder: 'Teléfono',
        order: 5
      }),

      new TextboxField({
        key: 'occupation',
        label: 'Ocupación',
        required: true,
        placeholder: 'Ocupación',
        order: 6
      }),

      new DropdownField({
        key: 'gender',
        label: 'Género',
        options: [
          {key: 'male',  value: 'Hombre'},
          {key: 'female',  value: 'Mujer'}
        ],
        required: true,
        order: 7
      }),

      new DatepickerField({
        key: 'birthdate',
        label: 'Birthdate',
        required: true,
        placeholder: 'Fecha de nacimiento',
        order: 8
      }),

      new TextboxField({
        key: 'country',
        label: 'Country',
        required: true,
        placeholder: 'País',
        order: 9
      }),

      new TextboxField({
        key: 'postalCode',
        label: 'Postal Code',
        required: true,
        placeholder: 'Código Postal',
        order: 10
      }),
    ];

    return fields.sort((a, b) => a.order - b.order);
  }

  getSecondFormFields() {
    const fields: ButtonToggleField[] = [
      new ButtonToggleField({
        label: 'FIN DE LA POBREZA',
        order: 1
      }),

      new ButtonToggleField({
        label: 'HAMBRE CERO',
        order: 2
      }),

      new ButtonToggleField({
        label: 'SALUD Y BIENESTAR',
        order: 3
      }),

      new ButtonToggleField({
        label: 'EDUCACIÓN DE CALIDAD',
        order: 4
      }),

      new ButtonToggleField({
        label: 'IGUALDAD DE GÉNERO',
        order: 5
      }),

      new ButtonToggleField({
        label: 'AGUA LIMPIA Y SANEAMIENTO',
        order: 6
      }),

      new ButtonToggleField({
        label: 'ENERGÍA ASEQUIBLE Y NO CONTAMINANTE',
        order: 7
      }),

      new ButtonToggleField({
        label: 'TRABAJO DECENTE Y CRECIMIENTO ECONÓMICO',
        order: 8
      }),

      new ButtonToggleField({
        label: 'INDUSTRIA, INNOVACIÓN E INFRAESTRUCTURA',
        order: 9
      }),

      new ButtonToggleField({
        label: 'REDUCCIÓN DE LAS DESIGUALDADES',
        order: 10
      }),

      new ButtonToggleField({
        label: 'CIUDADES Y COMUNIDADES SOSTENIBLES',
        order: 11
      }),

      new ButtonToggleField({
        label: 'PRODUCCIÓN Y CONSUMO RESPONSABLES',
        order: 12
      }),

      new ButtonToggleField({
        label: 'ACCIÓN POR EL CLIMA',
        order: 13
      }),

      new ButtonToggleField({
        label: 'VIDA SUBMARINA',
        order: 14
      }),

      new ButtonToggleField({
        label: 'VIDA DE ECOSISTEMAS TERRESTRES',
        order: 15
      }),

      new ButtonToggleField({
        label: 'PAZ, JUSTICIA E INSTITUCIONES SÓLIDAS',
        order: 16
      }),

      new ButtonToggleField({
        label: 'ALIANZAS PARA LOGRAR LOS OBJETIVOS',
        order: 17
      }),

    ];

    return fields.sort((a, b) => a.order - b.order);
  }
}
