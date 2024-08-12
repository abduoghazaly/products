import { Injectable, signal } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>([]);

  constructor() {}

  addProductToCart(product: Product) {
    let prodSet = new Set([...this.cart(), product]);
    this.cart.set([...prodSet]);
  }
}
