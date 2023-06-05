import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'amount', 'total'];
  cart: Product[] = [];
  
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cart = this.cartService.getCart();
  }

  getTotalValue(): number {
    let totalValue = 0;
    this.cart!.forEach(element => {
      totalValue += element.orderedQuantity * element.price;
    });
    return totalValue;
  }

}
