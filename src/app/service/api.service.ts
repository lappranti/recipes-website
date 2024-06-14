import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get(`${this.baseUrl}/categories.php`);
  }

  getMealsByCategory(category: string) {
    return this.http.get(`${this.baseUrl}/filter.php?c=${category}`);
  }

  getDetailMeal(id: string) {
    return this.http.get(`${this.baseUrl}/lookup.php?i=${id}`);
  }

  searMeal(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search.php?s=${name}`);
  }
}
