import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SearchingComponent } from './searching/searching.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {animation: 'landing'}
  },
  {
    path: 'search',
    component: SearchingComponent,
    data: {animation: 'searching'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
