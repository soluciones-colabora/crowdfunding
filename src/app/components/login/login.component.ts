import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

import { EmailRegisteredValidator } from '../../validators/email-registered.directive';
import { matchPasswordValidator } from '../../validators/match-password.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;
  public hide = true;
  // email = new FormControl('', {
  //   updateOn: 'blur',
  //   validators: Validators.compose([Validators.required, Validators.email]),
  //   asyncValidators : this.emailRegistered.validate.bind(this.emailRegistered)
  // });
  // password = new FormControl('', [Validators.required]);

  getErrorEmail ( ) {
    return  this.formulario.get('email').hasError('required') ? 'Ingrese su correo' :
            this.formulario.get('email').hasError('email') ? 'Correo electrónico inválido' :
            this.formulario.get('email').hasError('emailRegistered') ? 'El correo electrónico no ha sido registrado' : '';
  }

  getErrorPassword ( ) {
    return this.formulario.get('password').hasError('required') ? 'Ingrese su contraseña' : '';
  }

  // getErrorForm() {
  //   return this.formulario.hasError('matchPassword') ? 'The password fields must have the same value' :
  //           '';
  // }


  constructor(public auth: AuthService,
              private router: Router,
              private emailRegistered: EmailRegisteredValidator,
              private formBuilder: FormBuilder) {

                this.formulario = this.formBuilder.group({
                  // Datos de usuario
                  email: ['', {
                    updateOn: 'blur',
                    validators: Validators.compose([Validators.required, Validators.email]),
                    asyncValidators : this.emailRegistered.validate.bind(this.emailRegistered)
                  }],
                  password: ['', Validators.required],
                  rememberPassword: [false]
                });
  }


  ngOnInit() {

  }

  getPassword() {
    console.log('Olvidé contraseña');
  }

  async register() {
    console.log('Te estás registrando');
    const email = this.formulario.get('email').value;
    const password = this.formulario.get('password').value;
    // Expiration time should vary depending on this value:
    const rememberPassword = this.formulario.get('rememberPassword').value;

    await this.auth.emailLogin(email, password);
    await this.afterSignIn();
  }

  async signInWithFacebook() {
    console.log('I was clicked!');
    await this.auth.facebookLogin();
    await this.afterSignIn();
  }

  /// Shared

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.

    return this.router.navigate(['/']);
  }

}
