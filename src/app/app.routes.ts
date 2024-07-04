import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/movie-list/movie-list.component').then(
        (module) => module.MovieListComponent,
      ),
    pathMatch: 'full',
  },
  {
    path: ':movieId',
    loadComponent: () =>
      import('./components/movie-details/movie-details.component').then(
        (module) => module.MovieDetailsComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
