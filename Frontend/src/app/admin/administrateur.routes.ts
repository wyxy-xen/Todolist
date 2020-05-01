import { Routes } from '@angular/router';
import { adminRoute } from './administrateur/administrateur.route';


const ADMIN_ROUTES = [adminRoute];

export const adminRoutes: Routes = [
    {
        path: 'administrateur',
        children: ADMIN_ROUTES
    }
];
