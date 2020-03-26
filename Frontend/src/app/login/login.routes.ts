import { loginRoute } from './login/login.route';
import { Routes } from '@angular/router';

const LOGIN_ROUTES = [loginRoute];
export const loginRoutes: Routes = [{
    path: 'login',
    children: LOGIN_ROUTES
}];
