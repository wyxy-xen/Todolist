import { Routes } from '@angular/router';
import { bilanRoute } from './bilan/bilan.route';

const BILAN_ROUTES = [bilanRoute];

export const bilanRoutes: Routes = [
    {
        path: 'bilan',
        children: BILAN_ROUTES
    }
];
