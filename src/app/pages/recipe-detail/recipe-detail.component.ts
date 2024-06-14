import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent {
  mealId!: string;
  mealDetails!: any;
  ingredients: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) {
    this.mealId = this.route.snapshot.paramMap.get('id')!;
    this.getMealDetails();
  }

  getMealDetails() {
    this.api.getDetailMeal(this.mealId).subscribe((resp) => {
      this.mealDetails = resp;
      this.mealDetails = this.mealDetails.meals[0];
      this.extractIngredients();
      console.log(this.mealDetails);
    });
  }

  extractIngredients(): void {
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.mealDetails[`strIngredient${i}`];
      const measure = this.mealDetails[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredientsList.push(`${measure} ${ingredient}`.trim());
      }
    }
    this.ingredients = ingredientsList;
  }

  goBack(): void {
    this.location.back();
  }
  formatInstructions(instructions: string): string {
    return instructions.replace(/(?:\r\n|\r\n\r|\n)/g, '<br>');
  }
}
