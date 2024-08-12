import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ProductService } from '../../service/product.service';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnDestroy {
  _sub$: Subject<boolean> = new Subject();

  constructor(
    public userService: UserService,
    public productService: ProductService,
    public cartService: CartService
  ) {}

  search() {
    this.productService.getproducts()?.pipe(takeUntil(this._sub$)).subscribe();
  }

  ngOnDestroy(): void {
    this._sub$.next(true);
    this._sub$.complete();
  }
}
