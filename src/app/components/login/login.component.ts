import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

import { EmailAvailableValidator } from '../../validators/email-available.directive';
import { matchPasswordValidator } from '../../validators/match-password.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup;
  // email = new FormControl('', {
  //   updateOn: 'blur',
  //   validators: Validators.compose([Validators.required, Validators.email]),
  //   asyncValidators : this.emailAvailable.validate.bind(this.emailAvailable)
  // });
  // password = new FormControl('', [Validators.required]);

  getErrorMessage( fieldName: string) {
    // console.log('this.formulario.get(fieldName) :', this.formulario.get(fieldName).errors);
    return this.formulario.get(fieldName).hasError('required') ? 'You must enter a value' :
            this.formulario.get(fieldName).hasError('email') ? 'Not a valid email' :
            this.formulario.get(fieldName).hasError('emailAvailable') ? 'This email has already been registered' :
            '';
  }

  getErrorForm() {
    return this.formulario.hasError('matchPassword') ? 'The password fields must have the same value' :
            '';
  }


  constructor(public auth: AuthService,
              private router: Router,
              private emailAvailable: EmailAvailableValidator,
              private formBuilder: FormBuilder) {

                this.formulario = this.formBuilder.group({
                  // Datos de usuario
                  email: ['', {
                    updateOn: 'blur',
                    validators: Validators.compose([Validators.required, Validators.email]),
                    asyncValidators : this.emailAvailable.validate.bind(this.emailAvailable)
                  }],
                  password: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{6,18}/),
                    ])],
                  password_confirm: ['', Validators.required]
                }, { validator: Validators.compose([matchPasswordValidator]) });
  }


  ngOnInit() {

  }

  register() {
    console.log('Te estás registrando');
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
