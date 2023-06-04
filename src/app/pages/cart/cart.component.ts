import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'amount', 'total'];
  cart: Product[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    let productList = localStorage.getItem('cart_items');
    if(productList){
      this.cart = JSON.parse(productList);
    }
  }

  getTotalValue(): number {
    let totalValue = 0;
    this.cart!.forEach(element => {
      totalValue += element.orderedQuantity * element.price;
    });
    return totalValue;
  }

}
