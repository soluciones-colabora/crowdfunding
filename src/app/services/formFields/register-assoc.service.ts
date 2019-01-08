import { Injectable } from '@angular/core';

import { DropdownField } from '../../dynamic-forms/classes/field-dropdown';
import { FieldBase } from '../../dynamic-forms/classes/field-base';
import { TextboxField } from '../../dynamic-forms/classes/field-textbox';
import { RadiobuttonField } from '../../dynamic-forms/classes/field-radiobutton';
import { FormField } from '../../dynamic-forms/classes/field-form';
import { UploadField } from '../../dynamic-forms/classes/field-upload';
import { DropZoneField } from '../../dynamic-forms/classes/field-dropZone';





@Injectable()
export class FieldService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getProductsFormFields() {

    const fields: FieldBase<any>[] = [
      new TextboxField({
        key: 'productName',
        label: 'Product Name',
        required: true,
        type: 'email',
        placeholder: 'Nombre del producto o servicio',
        order: 1
      }),

      new TextboxField({
        key: 'productDescription',
        label: 'Product Description',
        required: true,
        placeholder: 'Descripción',
        order: 2
      })

    ];

    return fields.sort((a, b) => a.order - b.order);
  }

  getTeamFormFields() {

    const fields: FieldBase<any>[] = [
      new TextboxField({
        key: 'teamName',
        label: 'Team Name',
        required: true,
        type: 'email',
        placeholder: 'Nombre',
        order: 1
      }),

      new TextboxField({
        key: 'teamPosition',
        label: 'Position',
        required: true,
        placeholder: 'Puesto',
        order: 2
      }),

      new UploadField({
        key: 'teamPhoto',
        // label: 'Team Photo',
        text: 'SUBIR ARCHIVO',
        type: 'image/*',
        order: 3
      })

    ];

    return fields.sort((a, b) => a.order - b.order);
  }

  getSocialNetworkFields() {

    const fields: FieldBase<any>[] = [
      new DropdownField({
        key: 'SNType',
        label: 'Tipo de red social',
        options: [
          {key: 'facebook',  value: 'facebook'},
          {key: 'twitter',  value: 'twitter'}
        ],
        required: true,
        order: 1
      }),

      new TextboxField({
        key: 'SNName',
        label: 'SNName',
        required: true,
        placeholder: 'Nombre de la red social',
        order: 2
      }),

      new TextboxField({
        key: 'SNUrl',
        label: 'SNUrl',
        required: true,
        placeholder: 'URL',
        order: 3
      }),

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
        required: true,
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
      })

    ];

    return fields.sort((a, b) => a.order - b.order);
  }

  getSecondFormFields() {
    const fields: FieldBase<any>[] = [
      new TextboxField({
        key: 'summary',
        label: 'Summary',
        required: true,
        textarea: true,
        placeholder: 'Resumen',
        order: 1
      }),

      new TextboxField({
        key: 'mission',
        label: 'Mission',
        required: true,
        textarea: true,
        placeholder: 'Misión',
        order: 2
      }),

      new TextboxField({
        key: 'vision',
        label: 'Vision',
        required: true,
        textarea: true,
        placeholder: 'Visión',
        order: 3
      }),

      new TextboxField({
        key: 'values',
        label: 'Values',
        required: true,
        textarea: true,
        placeholder: 'Valores (cada valor separado por una coma ",")',
        order: 4
      }),

      new TextboxField({
        key: 'beneficiaries',
        label: 'Beneficiaries',
        required: true,
        textarea: true,
        placeholder: 'Beneficiarios',
        order: 5
      }),

      new TextboxField({
        key: 'valueProposition',
        label: 'Value Proposition',
        required: true,
        textarea: true,
        placeholder: 'Propuesta de valor',
        order: 6
      }),

      new TextboxField({
        key: 'changeTheory',
        label: 'Change Theory',
        required: true,
        textarea: true,
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
        textarea: true,
        placeholder: 'Premios o reconocimientos (cada uno separado por una coma ",")',
        order: 9
      }),

      new FormField({
        key: 'products',
        label: 'Productos y servicios',
        fields: this.getProductsFormFields(),
        // required: true,
        cols: 2,
        childCols: 3,
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

      new FormField({
        key: 'team',
        label: 'Equipo',
        fields: this.getTeamFormFields(),
        // required: true,
        cols: 2,
        childCols: 4,
        order: 3
      }),

      new FormField({
        key: 'socialNetworks',
        label: 'Redes sociales',
        fields: this.getSocialNetworkFields(),
        // required: true,
        cols: 2,
        childCols: 4,
        order: 4
      }),

      new DropZoneField({
        key: 'gallery',
        label: 'Galería de fotos',
        text: 'Arrastra aquí tus imágenes',
        type: 'image/*',
        // required: true,
        cols: 2,
        rows: 2,
        order: 5
      })
    ];

    return fields.sort((a, b) => a.order - b.order);
  }

  getFormLabels() {
    const labels: string[] = ['Información básica', 'Acerca de la asociación', 'Equipo y redes'];
    return labels;
  }

}
