import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterMainComponent } from './components/register/register-main/register-main.component';
import { RegisterAssocComponent } from './components/register/register-assoc/register-assoc.component';
import { RegisterDonorComponent } from './components/register/register-donor/register-donor.component';


// import { Name3Component } from './';
// import { Name4Component } from './';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterMainComponent },
  { path: 'register/assoc', component: RegisterAssocComponent },
  { path: 'register/donor', component: RegisterDonorComponent },

  // { path: 'path3', component: Name3Component },
  // { path: 'path4', component: Name4Component },
  { path: '**', component: PageNotFoundComponent }

  // { path: 'path/:routeParam', component: MyComponent },
  // { path: 'staticPath', component: ... },
  // { path: '**', component: ... },
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
