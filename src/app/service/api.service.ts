import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data)
  // })
  // .catch(error => {
  //   console.log(error)
  // })

  getRecipes() {
    return this.http.get(
      'https://www.themealdb.com/api/json/v1/1/categories.php'
    );
  }

  getMealsByCategory(category: string) {
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
  }

  getDetailMeal(id: string) {
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
  }
}
