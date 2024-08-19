import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ListComponent } from './features/lists/components/list/list.component';

/**
 * List of available routes.
 */
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list/:id', component: ListComponent }
];
