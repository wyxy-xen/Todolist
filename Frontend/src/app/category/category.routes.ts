import { Routes } from '@angular/router';
import { categoryRoute } from './category/category.route';

const CATEGORY_ROUTES = [categoryRoute];

export const categoryRoutes: Routes = [
    {
        path: 'category',
        children: CATEGORY_ROUTES
    }
];
