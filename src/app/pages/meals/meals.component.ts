import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
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
import { DropdownDirective } from '../../directives/dropdown.directive';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DropdownDirective,
    PaginationComponent,
  ],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements OnInit {
  categorieList!: any;
  currentCategory!: string;
  mealList!: any;
  filteredMealList: any[] = [];
  selectedCategoryIndex!: number;

  searchForm!: FormGroup;
  searchResults: any[] = [];

  selectedSort = 'Name';
  sortOptions = ['Name', 'Category', 'Area', 'Tags', 'Ingredient'];

  currentPage: number = 1;
  itemsPerPage: number = 12;
  pageMeals: any[] = [];

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
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
        console.log(this.mealList);
      });
    });

    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => this.api.searMeal(value))
      )
      .subscribe((results) => {
        // console.log(results);

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
      this.currentPage = 1;
    });
  }

  get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }

  clearSearch(): void {
    this.search.reset();
    this.searchResults = [];
  }

  selectSort(sortType: string) {
    this.selectedSort = sortType;
    this.applySort();
    console.log(this.filteredMealList);
  }

  applySort() {
    switch (this.selectedSort) {
      case 'Name':
        this.filteredMealList.sort((a, b) =>
          a.strMeal.localeCompare(b.strMeal)
        );
        break;
      case 'Category':
        this.filteredMealList.sort((a, b) =>
          a.strCategory.localeCompare(b.strCategory)
        );
        break;
      case 'Area':
        this.filteredMealList.sort((a, b) =>
          a.strArea.localeCompare(b.strArea)
        );
        break;
      case 'Tags':
        this.filteredMealList.sort((a, b) =>
          (a.strTags || '').localeCompare(b.strTags || '')
        );
        break;
      case 'Ingredient':
        // Assuming you have a primary ingredient to sort by
        this.filteredMealList.sort((a, b) =>
          (a.strIngredient1 || '').localeCompare(b.strIngredient1 || '')
        );
        break;
      case 'Date Added':
        // Assuming you have a dateAdded property
        this.filteredMealList.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
        break;
      default:
        break;
    }
  }

  onItemsChange(meals: any) {
    this.pageMeals = meals;
    this.cdr.detectChanges(); // Forcer la détection des changements
  }
}
