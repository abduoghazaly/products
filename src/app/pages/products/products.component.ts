import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../layout/pagination/pagination.component';
import { ProductCardComponent } from '../../component/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, PaginationComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  _sub$: Subject<boolean> = new Subject();
  selectedCategory = '';

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories().pipe(takeUntil(this._sub$)).subscribe();
    this.getProducts();
  }

  getProducts() {
    this.productService.getproducts()?.pipe(takeUntil(this._sub$)).subscribe();
  }

  changeCategory(selectedCategory: string) {
    this.productService.selectedCategory.set(selectedCategory);
    this.productService.page.set(1);
    this.productService.search.set('');
    this.getProducts();
  }

  changePage(page: number) {
    this.productService.page.set(page);
    this.getProducts();
  }

  ngOnDestroy(): void {
    this._sub$.next(true);
    this._sub$.complete();
  }
}
