import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonToggleField } from '../../../dynamic-forms/classes/field-buttonToggle';

// Imports for dialog
import { MatDialog } from '@angular/material';
import { ConfirmationDialog } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

// Importing the models and objects
import { DonnorService } from '../../../services/database/Donnor/donnor.service';
import { Donnor } from '../../../interfaces/donnor.interface';

import { FieldService } from '../../../services/formFields/register-donor.service';

@Component({
  selector: 'app-register-donor',
  templateUrl: './register-donor.component.html',
  styleUrls: ['./register-donor.component.scss'],
  providers:  [ FieldService ]
})
export class RegisterDonorComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  firstFormFields: any[];
  secondFormFields: any[];

  payload = {};


  constructor(
    public dialog: MatDialog,
    service: FieldService,
    private router: Router,
    private authService: AuthService,
    private donnorSrvc: DonnorService,
    private toastr:  ToastrService
    ) {
    this.firstFormFields = service.getFirstFormFields();
    this.secondFormFields = service.getSecondFormFields();
  }

  ngOnInit() {
  }

  onSubmit(index: number, payload: any = {}) {
    this.payload = Object.assign(this.payload, payload);
    const interests = {};
    this.secondFormFields.forEach(field => {
      interests[field.label] = field.checked;
    });
    this.payload = { ...this.payload, interests };
    console.log('payload :', this.payload);
    if (index === 1) {
      this.openDialog();
    }
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: {title: 'Terminar registro', message: '¿Desea registrarse?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('result :', result);
      if (result) {
        this.register();
      }
    });
  }

  private async register() {
    try {
      const email = this.payload['email'];
      const password = 'password';

      // Signup the new user and get its uid
      const credential = await this.authService.emailSignUp(email, password);
      const uid = credential.user.uid;

      // Send user email to verify its email
      await credential.user.sendEmailVerification();

      // Register donnor in DB
      const donnor: Donnor = { ...this.payload, uid: uid};
      await this.donnorSrvc.createDonnor(donnor);

      // Inform user register was succesful
      this.toastr.success('¡Su registro se realizó exitosamente!', '¡Éxito!', {
        timeOut: 10000
      });

      // Return to index
      this.router.navigate(['/index']);
    } catch (error) {
      // Should check for each type of error: SignUp, Upload, CreateDonnor
      console.log('error :', error);
      this.toastr.error('¡Hubo un error con su registro!', '¡Error!');
    }
  }

  buttonToggleChanged(field: ButtonToggleField) {
    field.checked = !field.checked;
  }

}
