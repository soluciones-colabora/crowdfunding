import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { ProfileGuard } from './services/guards/profile.guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterMainComponent } from './components/register/register-main/register-main.component';
import { RegisterAssocComponent } from './components/register/register-assoc/register-assoc.component';
import { RegisterDonorComponent } from './components/register/register-donor/register-donor.component';
import { AssocDetailComponent } from './components/assoc-detail/assoc-detail.component';


import { CampaignCreateComponent } from './components/campaign-create/campaign-create.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ApoyarComponent } from './components/apoyar/apoyar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoaderComponent } from './loader/loader.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterMainComponent },
  { path: 'register/assoc/:id', component: RegisterAssocComponent },
  { path: 'detail/:id', component: AssocDetailComponent },
  { path: 'register/donor/:id', component: RegisterDonorComponent },
  { path: 'apoyar', component: ApoyarComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'loader', component: LoaderComponent },
  { path: 'createCampaign/:id', component: CampaignCreateComponent, canActivate: [ProfileGuard] },
  // { path: 'path4', component: Name4Component },
  { path: '**', component: PageNotFoundComponent }

  // { path: 'path/:routeParam', component: MyComponent },
  // { path: 'staticPath', component: ... },
  // { path: '**', component: ... },
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
