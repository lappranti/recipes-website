import { Routes } from '@angular/router';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { MealsComponent } from './pages/meals/meals.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/recipes/recipes.router').then((m) => m.RecipesRoutes),
  },
 
];
