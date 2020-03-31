import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homeRoute } from './home/home.route';
import { signupRoutes } from './signup/signup.routes';
import { bilanRoutes } from './bilan/bilan.routes';
import { listRoutes } from './list/list.routes';
import { loginRoutes } from './login/login.routes';
import { categoryRoutes } from './category/category.routes';

const routes: Routes = [
  homeRoute,
  ...listRoutes,
  ...categoryRoutes,
  ...signupRoutes,
  ...loginRoutes,
  ...bilanRoutes,
  ...listRoutes,
  {path: '', redirectTo: 'home' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }