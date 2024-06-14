import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss',
})
export class MealsComponent implements AfterViewInit {
  categorieList!: any;
  currentCategory!: string;
  mealList!: any;
  selectedCategoryIndex: number = 0;

  constructor(private api: ApiService) {
    api.getRecipes().subscribe((resp) => {
      this.categorieList = resp;
      this.categorieList = this.categorieList.categories;
      this.currentCategory = this.categorieList[0].strCategory;
      // console.table(this.categorieList[0].strCategory);

      api.getMealsByCategory(this.currentCategory).subscribe((resp) => {
        // console.log(resp);
        this.mealList = resp;
        this.mealList = this.mealList.meals;
        console.log(this.mealList);
      });
    });
  }

  ngAfterViewInit(): void {}

  selectCategory(index: number, category: string): void {
    this.selectedCategoryIndex = index;
    this.currentCategory = category;

    this.api.getMealsByCategory(this.currentCategory).subscribe((resp) => {
      // console.log(resp);
      this.mealList = resp;
      this.mealList = this.mealList.meals;
    });
  }
}
