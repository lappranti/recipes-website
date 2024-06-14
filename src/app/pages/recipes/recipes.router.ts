// auth.router.ts

import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';

export const RecipesRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,

    children: [
      {
        path: '',
        redirectTo: 'meals',
        pathMatch: 'full',
      },
      {
        path: 'meals',
        loadComponent: () =>
          import('../meals/meals.component').then((c) => c.MealsComponent),
      },
      {
        path: 'meals/:id',
        loadComponent: () =>
          import('../recipe-detail/recipe-detail.component').then(
            (c) => c.RecipeDetailComponent
          ),
      },
    ],
  },
];
