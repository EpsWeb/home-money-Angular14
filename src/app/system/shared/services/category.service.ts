import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseApi {

  constructor(public override _http: HttpClient) {
    super(_http)
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category)
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories')
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category)
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`categories/${id}`);
  }

}






















