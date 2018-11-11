import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
// import { Name2Component } from './';
// import { Name3Component } from './';
// import { Name4Component } from './';
// import { PageNotFoundComponent } from './';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'path2', component: Name2Component },
  // { path: 'path3', component: Name3Component },
  // { path: 'path4', component: Name4Component },
  // { path: '**', component: PageNotFoundComponent },

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
