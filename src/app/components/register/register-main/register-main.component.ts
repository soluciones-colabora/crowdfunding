import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/authentication/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { EmailAvailableValidator } from '../../../validators/email-available.directive';
import { matchPasswordValidator } from '../../../validators/match-password.directive';

@Component({
  selector: 'app-register-main',
  templateUrl: './register-main.component.html',
  styleUrls: ['./register-main.component.scss']
})
export class RegisterMainComponent implements OnInit {
  public formulario: FormGroup;
  public hide = true;

  constructor (
    public auth: AuthService,
    private emailAvailable: EmailAvailableValidator,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      email: ['', {
        updateOn: 'blur',
        validators: Validators.compose([Validators.required, Validators.email]),
        asyncValidators : this.emailAvailable.validate.bind(this.emailAvailable)
      }],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    }, { validator: matchPasswordValidator });
  }

  ngOnInit() {
  }

  async register() {
    const email = this.formulario.get('email').value;
    const password = this.formulario.get('password').value;
    try {
      // Signup the new user and get its uid
      const credential = await this.auth.emailSignUp(email, password);
      await this.auth.updateUserData(credential.user);

      // const uid = credential.user.uid;

      // // Send user email to verify its email
      // await credential.user.sendEmailVerification();

      // // Register donnor in DB
      // const donnor: Donnor = { ...this.payload, uid: uid};
      // await this.donnorSrvc.createDonnor(donnor);
    } catch (error) {
      console.log('error :', error);
    }
  }

  getErrorEmail ( ) {
    return  this.formulario.get('email').hasError('required') ? 'Ingrese su correo' :
            this.formulario.get('email').hasError('email') ? 'Correo electrónico inválido' :
            this.formulario.get('email').hasError('emailAvailable') ? 'El correo electrónico ya ha sido registrado' : '';
  }

  getErrorPassword ( ) {
    return this.formulario.get('password').hasError('required') ? 'Ingrese su contraseña' : '';
  }

}
