import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { signupRoutes } from './signup/signup.routes';
import { bilanRoutes } from './bilan/bilan.routes';
import { listRoutes } from './list/list.routes';
import { loginRoutes } from './login/login.routes';
import { categoryRoutes } from './category/category.routes';
import { adminRoutes } from './admin/administrateur.routes';

const routes: Routes = [
  ...listRoutes,
  ...categoryRoutes,
  ...signupRoutes,
  ...loginRoutes,
  ...bilanRoutes,
  ...listRoutes,
  ...adminRoutes,
  {path: '', redirectTo: 'login' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }