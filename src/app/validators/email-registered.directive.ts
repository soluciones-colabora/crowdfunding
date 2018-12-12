import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { AuthService } from '../services/authentication/auth.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class EmailRegisteredValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      this.authService.verifyEmail(ctrl.value)
      .then((arr) => {
        resolve(!arr.length ? {emailRegistered : true} : null);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

@Directive({
  selector: '[appEmailRegistered]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailRegisteredValidator),
      multi: true
    }
  ]
})
export class EmailRegisteredDirective {

  constructor(private validator: EmailRegisteredValidator) { }

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}
