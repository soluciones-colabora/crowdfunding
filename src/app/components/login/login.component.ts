import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
            '';
  }


  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit() {

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
