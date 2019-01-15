import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

// Angular Material
import { MaterialComponentsModule } from './material-components/material-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Routing
import { AppRoutingModule } from './/app-routing.module';

// Directives
import { DropZoneDirective } from './drop-zone.directive';

// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// Validators
import { EmailAvailableDirective } from './validators/email-available.directive';
import { EmailRegisteredDirective } from './validators/email-registered.directive';
import { MatchPasswordValidatorDirective } from './validators//match-password.directive';

// Components
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterMainComponent } from './components/register/register-main/register-main.component';
import { RegisterAssocComponent } from './components/register/register-assoc/register-assoc.component';
import { RegisterDonorComponent } from './components/register/register-donor/register-donor.component';
import { InicioComponent } from './inicio/inicio.component';

// Modules
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { OwlModule } from 'ngx-owl-carousel';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
// import { DynamicFormComponent } from './dynamic-forms/dynamic-form/dynamic-form.component';
// import { DynamicFormControlComponent } from './dynamic-forms/dynamic-form-control/dynamic-form-field.component';

import { DynamicFormFieldComponent } from './dynamic-forms/components/dynamic-form-field/dynamic-form-field.component';
import { DynamicFormComponent } from './dynamic-forms/components/dynamic-form/dynamic-form.component';
import { ConfirmationDialog } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DropZoneDirective,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    EmailAvailableDirective,
    EmailRegisteredDirective,
    MatchPasswordValidatorDirective,
    RegisterMainComponent,
    RegisterAssocComponent,
    RegisterDonorComponent,
    InicioComponent,
    MainNavComponent,
    DynamicFormComponent,
    // DynamicFormControlComponent,
    DynamicFormFieldComponent,
    ConfirmationDialog
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    MaterialComponentsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    MDBBootstrapModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 10,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    OwlModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [ConfirmationDialog]
})
export class AppModule { }
