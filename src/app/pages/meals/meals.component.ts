import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements AfterViewInit {
  categorieList!: any;
  currentCategory!: string;
  mealList!: any;
  selectedCategoryIndex!: number;

  searchForm!: FormGroup;
  searchResults: any[] = [];

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngAfterViewInit(): void {
    this.api.getRecipes().subscribe((resp) => {
      this.categorieList = resp;
      this.categorieList = this.categorieList.categories;

      if (localStorage['categoryMeal']) {
        this.currentCategory = localStorage['categoryMeal'];
        this.selectedCategoryIndex = this.categorieList.findIndex(
          (category: { strCategory: string }) =>
            category.strCategory == this.currentCategory
        );
      } else {
        this.currentCategory = this.categorieList[0].strCategory;
        this.selectedCategoryIndex = 0;
      }

      this.api.getMealsByCategory(this.currentCategory).subscribe((resp) => {
        this.mealList = resp;
        this.mealList = this.mealList.meals;
      });
    });

    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => this.api.searMeal(value))
      )
      .subscribe((results) => {
        console.log(results);

        this.searchResults = results.meals || [];
      });
  }

  selectCategory(index: number, category: string): void {
    this.selectedCategoryIndex = index;
    this.currentCategory = category;
    localStorage['categoryMeal'] = this.currentCategory;

    this.api.getMealsByCategory(this.currentCategory).subscribe((resp) => {
      this.mealList = resp;
      this.mealList = this.mealList.meals;
    });
  }

  get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }

  clearSearch(): void {
    this.search.reset();
    this.searchResults = [];
  }
}
