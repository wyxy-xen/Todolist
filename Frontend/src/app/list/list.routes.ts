import { Routes } from '@angular/router';
import { doneListRoute } from './done-list/done-list.route';
import { todoListRoute } from './todo-list/todo-list.route';

const LIST_ROUTES = [todoListRoute, doneListRoute];

export const listRoutes: Routes = [
    {
        path: 'list',
        children: LIST_ROUTES
    }
];
