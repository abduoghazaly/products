import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  constructor(public cartService: CartService) {}
}
