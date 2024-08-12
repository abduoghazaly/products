import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<any>([]);
  categories = signal<string[]>([]);
  limit = 20;
  page = signal<number>(1);
  totalProducts = signal<number>(0);
  search = signal<string>('');
  selectedCategory = signal<string>('');

  get isPagination() {
    return !(
      this.totalProducts() < this.page() * this.limit && this.page() <= 1
    );
  }

  get totalPages() {
    return this.totalProducts() < 1
      ? 0
      : Math.ceil(this.totalProducts() / this.limit);
  }

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http
      .get<string[]>('https://dummyjson.com/products/category-list')
      .pipe(tap((e) => this.categories.set(e)));
  }

  getproducts() {
    if (this.totalProducts() < (this.page() - 1) * this.limit) return;
    let api = '';
    let params = new HttpParams();
    params = params.append('limit', this.limit);
    params = params.append('skip', (this.page() - 1) * this.limit);
    if (this.search() != '') {
      params = params.append('q', this.search());
      api = '/search';
    }
    if (this.selectedCategory() != '') {
      api = '/category/' + this.selectedCategory();
    }
    return this.http
      .get<any>(`https://dummyjson.com/products${api ?? ''}`, { params })
      .pipe(
        tap((e) => {
          this.products.set(e['products']);
          this.totalProducts.set(e['total']);
        })
      );
  }
}
