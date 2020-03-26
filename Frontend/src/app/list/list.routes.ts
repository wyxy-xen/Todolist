import { Routes } from '@angular/router';
import { listRoute } from './list/list.route';

const LIST_ROUTES = [listRoute];

export const listRoutes: Routes = [
    {
        path: 'list',
        children: LIST_ROUTES
    }
];
