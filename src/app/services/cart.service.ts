import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
    providedIn: 'root'
  })
export class CartService {
  private cart$: Product[] = [];

  constructor() {
    let productList = localStorage.getItem('cart_items');
    if(productList){
      this.cart$ = JSON.parse(productList);
    }
  }

  setCart(cart: any) {
    this.cart$ = cart;
  }

  getCart(): Product[]{
    return this.cart$;
  }

  getNumberOfItemsInCart(): number {
    let itemCounter = 0;
    this.cart$.forEach(element => {
      itemCounter += element.orderedQuantity;
    });
    return itemCounter;
  }

}